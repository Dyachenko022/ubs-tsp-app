//
//  SplashScreen.m
//  ubsTspApp
//
//  Created by Yuriy Kalugin on 28.01.2022.
//

#import "SplashScreen.h"
#import <React/RCTLog.h>

BOOL isShown = false;

@implementation SplashScreen

+ (SplashScreen *)sharedObject {
    static SplashScreen *sharedClass = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedClass = [[self alloc] init];
    });
    return sharedClass;
}

- (id)init {
    if (self = [super init]) {
      isShown = NO;
    }
    return self;
}


-(void)show {
 // if (isShown == NO) {
    UIStoryboard *storyboard = [UIStoryboard storyboardWithName:@"LaunchScreen" bundle:nil];
    UIViewController * vc = [storyboard instantiateViewControllerWithIdentifier:@"LaunchVC"];
    UIView *view = vc.view;
    view.tag = 101;
    [UIApplication.sharedApplication.keyWindow.subviews.lastObject addSubview:view];
 //   isShown = YES;
 // }
}

-(void)hide {
 // if (isShown == YES) {
    UIView *view = (UIImageView *)[UIApplication.sharedApplication.keyWindow.subviews.lastObject viewWithTag:101];
    [view removeFromSuperview];
//    isShown = NO;
 // }
}
@end

@implementation SplashScreenNativeModule
  RCT_EXPORT_MODULE(splashScreen);


RCT_EXPORT_METHOD(hide:(NSString *)whatever)
{
  RCTLogInfo(@"HERER");
  dispatch_async(dispatch_get_main_queue(), ^{
    [SplashScreen.sharedObject hide];
  });
}
@end
