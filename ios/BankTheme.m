#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(BankTheme, NSObject)

RCT_EXTERN_METHOD(setNativeThemeType:(NSString *)themeType)

RCT_EXTERN_METHOD(loadNativeThemeType:(RCTPromiseResolveBlock)resolve
                                       rejecter: (RCTPromiseRejectBlock)reject)


@end
