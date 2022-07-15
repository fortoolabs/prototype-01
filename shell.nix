{ pkgs ? import <nixpkgs> { } }:

let
  lib = import <nixpkgs/lib>;

in
pkgs.mkShell {
  packages = with pkgs; [
    nodejs-16_x
    nodePackages.npm
  ];
}
