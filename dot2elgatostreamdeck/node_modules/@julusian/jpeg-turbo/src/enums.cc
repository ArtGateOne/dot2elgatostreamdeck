#include "enums.h"

void InitializeEnums(const Napi::Env &env, Napi::Object &exports)
{
  exports.Set("FORMAT_RGB", static_cast<unsigned long>(TJPF_RGB));
  exports.Set("FORMAT_BGR", static_cast<unsigned long>(TJPF_BGR));
  exports.Set("FORMAT_RGBX", static_cast<unsigned long>(TJPF_RGBX));
  exports.Set("FORMAT_BGRX", static_cast<unsigned long>(TJPF_BGRX));
  exports.Set("FORMAT_XRGB", static_cast<unsigned long>(TJPF_XRGB));
  exports.Set("FORMAT_XBGR", static_cast<unsigned long>(TJPF_XBGR));
  exports.Set("FORMAT_GRAY", static_cast<unsigned long>(TJPF_GRAY));
  exports.Set("FORMAT_RGBA", static_cast<unsigned long>(TJPF_RGBA));
  exports.Set("FORMAT_BGRA", static_cast<unsigned long>(TJPF_BGRA));
  exports.Set("FORMAT_ABGR", static_cast<unsigned long>(TJPF_ABGR));
  exports.Set("FORMAT_ARGB", static_cast<unsigned long>(TJPF_ARGB));

  exports.Set("SAMP_444", static_cast<unsigned long>(TJSAMP_444));
  exports.Set("SAMP_422", static_cast<unsigned long>(TJSAMP_422));
  exports.Set("SAMP_420", static_cast<unsigned long>(TJSAMP_420));
  exports.Set("SAMP_GRAY", static_cast<unsigned long>(TJSAMP_GRAY));
  exports.Set("SAMP_440", static_cast<unsigned long>(TJSAMP_440));
}
