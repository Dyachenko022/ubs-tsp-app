//
//  BankThemeBase.swift
//  ubsTspApp
//
//  Created by Yuriy Kalugin on 16.08.2021.
//

import Foundation

protocol BankThemeBase : NSObject {
  var colors: Colors { get set }
  var serverUrl: String { get set }
  var appName: String { get set }
  var latitude: String { get set }
  var longitude: String { get set }
}

internal struct Colors {
  var textLight: String
  var textDark: String
  var link: String
  var buttonFilled: String
  var gradientLight: [[String]]
  var gradientDark: [[String]]
  
  var dictionary: [String: Any] {
      return [
        "textLight": textLight,
        "textDark": textDark,
        "link": link,
        "buttonFilled": buttonFilled,
        "gradientLight": gradientLight,
        "gradientDark": gradientDark,
      ];
  }
  
  var nsDictionary: NSDictionary {
      return dictionary as NSDictionary
  }
}
