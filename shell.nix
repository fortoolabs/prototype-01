{ pkgs ? import <nixpkgs> { } }:

let
  lib = import <nixpkgs/lib>;

  supabase-cli = (import
    (pkgs.fetchFromGitHub {
      owner = "NixOS";
      repo = "nixpkgs";
      rev = "3ff39f984faa5f528f7ac5e548110d4e20327aa1";
      sha256 = "sha256-WpK0/4n0JvlN8bOHo0kKzi51iHNJcwPQFUSmO8sqzQ4=";
    })
    { }).supabase-cli;
in
pkgs.mkShell
{
  packages = with pkgs;
    [
      nodejs-16_x
      nodePackages.npm
      supabase-cli
    ];
}
