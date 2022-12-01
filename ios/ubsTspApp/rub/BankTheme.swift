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
      link: "#50A5E0",
      buttonFilled: "#1065B1",
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
    appName = "РУБ-Онлайн QR";
    latitude = "55.761099";
    longitude = "37.654990";

    serverUrl = "https://test.unisab.ru";
    //serverUrl = "https://sbp.rubank.ru:12443";//TST
    //serverUrl = "https://client.rubank.ru";//PROD
  }
  
}

