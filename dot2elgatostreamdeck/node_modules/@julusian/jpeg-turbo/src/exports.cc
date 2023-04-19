#include "util.h"
#include "enums.h"
#include "buffersize.h"
#include "compress.h"
#include "decompress.h"

Napi::Object Init(Napi::Env env, Napi::Object exports)
{
  // FT_Init_FreeType(&library);

  // sprintf(version, "%i.%i.%i", FREETYPE_MAJOR, FREETYPE_MINOR, FREETYPE_PATCH);
  // exports.Set("FreeTypeVersion", version);

  exports.Set("bufferSize", Napi::Function::New(env, BufferSize));
  exports.Set("compress", Napi::Function::New(env, CompressAsync));
  exports.Set("compressSync", Napi::Function::New(env, CompressSync));
  exports.Set("decompress", Napi::Function::New(env, DecompressAsync));
  exports.Set("decompressSync", Napi::Function::New(env, DecompressSync));

  InitializeEnums(env, exports);

  return exports;
}

NODE_API_MODULE(jpegturbo, Init)
