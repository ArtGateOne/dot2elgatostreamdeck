#ifndef NODE_JPEGTURBO_COMPRESS_H
#define NODE_JPEGTURBO_COMPRESS_H

#include "util.h"

Napi::Value CompressAsync(const Napi::CallbackInfo &info);
Napi::Value CompressSync(const Napi::CallbackInfo &info);

#endif
