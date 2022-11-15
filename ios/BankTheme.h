//
//  BankTheme.h
//  ubsTspApp
//
//  Created by Yuriy Kalugin on 16.08.2021.
//

#ifndef BankTheme_h
#define BankTheme_h

#import <React/RCTBridgeModule.h>

@interface BankTheme : NSObject <RCTBridgeModule>
@end

#define BACKGROUND_COLOR [UIColor colorWithRed:(36/255.0) green:(32/255.0) blue:(125/255.0) alpha:1]
#define LAUNCH_LOGO_NAMED @"krk_launchlogo.png"

#endif /* BankTheme_h */
