#include "buffersize.h"

Napi::Value BufferSize(const Napi::CallbackInfo &info)
{
  Napi::Env env = info.Env();

  if (info.Length() < 1)
  {
    Napi::TypeError::New(env, "Not enough arguments")
        .ThrowAsJavaScriptException();
    return env.Null();
  }

  if (!info[0].IsObject())
  {
    Napi::TypeError::New(env, "Invalid options").ThrowAsJavaScriptException();
    return env.Null();
  }
  Napi::Object options = info[0].As<Napi::Object>();

  BufferSizeOptions parsedOptions = ParseBufferSizeOptions(env, options);
  if (!parsedOptions.valid)
  {
    return env.Null();
  }

  // Finally, calculate the buffer size
  uint32_t dstLength = tjBufSize(parsedOptions.width, parsedOptions.height, parsedOptions.subsampling);
  Napi::Number result = Napi::Number::New(env, dstLength);

  return result;
}
