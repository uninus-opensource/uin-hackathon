{ pkgs, ... }:

{
  packages = with pkgs; [ nodejs ];
  languages.nix.enable = true;
  languages.typescript.enable = true;
}
