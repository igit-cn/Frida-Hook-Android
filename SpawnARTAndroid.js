var exports = Module.enumerateExportsSync("libart.so");
    for(var i=0;i<exports.length;i++){
        if(exports[i].name == "_ZN3art7DexFile10OpenCommonEPKhmRKNSt3__112basic_stringIcNS3_11char_traitsIcEENS3_9allocatorIcEEEEjPKNS_10OatDexFileEbbPS9_PNS0_12VerifyResultE"){
            var openMemory = new NativePointer(exports[i].address);
        }
     }
Interceptor.attach(openMemory, {
    onEnter: function (args) {
        var begin = args[1]
        console.log("magic : " + Memory.readUtf8String(begin))
        var address = parseInt(begin,16) + 0x20
        var dex_size = Memory.readInt(ptr(address))
        console.log("dex_size :" + dex_size)
        var file = new File("/data/data/%s/" + dex_size + ".dex", "wb")
        file.write(Memory.readByteArray(begin, dex_size))
        file.flush()
        file.close()
        var send_data = {}
        send_data.base = parseInt(begin,16)
        send_data.size = dex_size
        send(send_data)
    },
    onLeave: function (retval) {
        if (retval.toInt32() > 0) {
        }
    }
});