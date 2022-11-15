//
//  BankTheme.swift
//  ubsTspApp
//
//  Created by Yuriy Kalugin on 16.08.2021.
//

import Foundation

internal class BankTheme: NSObject, BankThemeBase {
  var colors: Colors
  var serverUrl: String
  var appName: String
  var latitude: String
  var longitude: String
  
  override init() {
    colors = Colors(
      textLight: "#2E3D49",
      textDark: "#FFFFFF",
      link: "#E46E24",
      buttonFilled: "#F47321",
      gradientLight: [
        ["rgba(36, 118, 250, 0.6)", "rgba(0, 122, 160, 0.7)"],
        ["rgba(66, 90, 216, 0.6)", "rgba(124, 49, 183, 0.7)"],
        ["rgba(113, 51, 244, 0.6)", "rgba(153, 28, 197, 0.7)"],
        ["rgba(244, 65, 100, 0.6)", "rgba(151, 0, 0, 0.7)"],
      ],
      gradientDark: [
        ["rgba(36, 118, 250, 0.6)", "rgba(0, 122, 160, 0.7)"],
        ["rgba(66, 90, 216, 0.6)", "rgba(124, 49, 183, 0.7)"],
        ["rgba(113, 51, 244, 0.6)", "rgba(153, 28, 197, 0.7)"],
        ["rgba(244, 65, 100, 0.6)", "rgba(151, 0, 0, 0.7)"],
      ]
    );
    appName = "QR.IPB";
    latitude = "55.661112";
    longitude = "37.626922";

    //serverUrl = "https://on-linem.ipb.ru"; //PROD
    serverUrl = "https://mobile-t.ipb.ru";   //TST
    //serverUrl = "https://test.unisab.ru";
  }
  
}

