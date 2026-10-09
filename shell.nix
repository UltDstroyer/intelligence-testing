{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  packages = with pkgs; [
    nodejs_22
    python312
    python312Packages.virtualenv
    git
  ];

  shellHook = ''
    echo "Intelligence Testing M0 development shell"
    echo "See docs/DEVELOPMENT.md for local setup."
  '';
}
