#include "util.h"

// Napi::Value getProperty(const Napi::Object &obj, const char *name)
// {
// }

BufferSizeOptions ParseBufferSizeOptions(const Napi::Env &env, const Napi::Object &options)
{
  Napi::Value tmpWidth = options.Get("width");
  if (!tmpWidth.IsNumber())
  {
    Napi::TypeError::New(env, "Invalid width").ThrowAsJavaScriptException();
    return BufferSizeOptions{false};
  }
  uint32_t width = tmpWidth.As<Napi::Number>().Uint32Value();

  Napi::Value tmpHeight = options.Get("height");
  if (!tmpHeight.IsNumber())
  {
    Napi::TypeError::New(env, "Invalid height").ThrowAsJavaScriptException();
    return BufferSizeOptions{false};
  }
  uint32_t height = tmpHeight.As<Napi::Number>().Uint32Value();

  uint32_t subsampling = NJT_DEFAULT_SUBSAMPLING;
  Napi::Value tmpSubsampling = options.Get("subsampling");
  if (!tmpSubsampling.IsUndefined())
  {
    if (!tmpSubsampling.IsNumber())
    {
      Napi::TypeError::New(env, "Invalid subsampling").ThrowAsJavaScriptException();
      return BufferSizeOptions{false};
    }
    subsampling = tmpSubsampling.As<Napi::Number>().Uint32Value();
  }

  switch (subsampling)
  {
  case TJSAMP_444:
  case TJSAMP_422:
  case TJSAMP_420:
  case TJSAMP_GRAY:
  case TJSAMP_440:
    break;
  default:
    Napi::TypeError::New(env, "Invalid subsampling").ThrowAsJavaScriptException();
    return BufferSizeOptions{false};
  }

  return BufferSizeOptions{true, width, height, subsampling};
}
