//
//  SplashScreen.h
//  ubsTspApp
//
//  Created by Yuriy Kalugin on 28.01.2022.
//
#import <UIKit/UIKit.h>
#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface SplashScreen : NSObject {
}
+ (SplashScreen *)sharedObject;
- (void)show;
- (void)hide;
  
@end

@interface SplashScreenNativeModule : NSObject <RCTBridgeModule>
@end
