#ifndef NODE_JPEGTURBO_DECOMPRESS_H
#define NODE_JPEGTURBO_DECOMPRESS_H

#include "util.h"

Napi::Value DecompressAsync(const Napi::CallbackInfo &info);
Napi::Value DecompressSync(const Napi::CallbackInfo &info);

#endif
