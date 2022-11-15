//
//  BankTheme.swift
//  ubsTspApp
//
//  Created by Yuriy Kalugin on 16.08.2021.
//

import Foundation

internal class BankTheme: NSObject, BankThemeBase {
  var serverUrl: String
  var appName: String
  var latitude: String
  var longitude: String
  var colors: Colors
  
  override init() {
    colors = Colors(
      textLight: "#2E3D49",
      textDark: "#FFFFFF",
      link: "#7E93FF",
      buttonFilled: "#3F5EFF",
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
    appName = "Крокус-Банк ТСП";
    latitude = "55.824430";
    longitude = "37.388902";

    serverUrl = "https://test.unisab.ru";
    //KRK
    //serverUrl = "https://online-t.crocusbank.ru"; //TST
    //serverUrl = "https://online.crocusbank.ru"; //PROD
    
    //IPB
    //serverUrl = "https://on-linem.ipb.ru"; //PROD
  }
  
}

