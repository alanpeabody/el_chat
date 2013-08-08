defmodule ElChat.Mixfile do
  use Mix.Project

  def project do
    [ app: :el_chat,
      version: "0.0.1",
      elixir: "~> 0.10.1",
      deps: deps ]
  end

  # Configuration for the OTP application
  def application do
    [ mod: { ElChat, [] },
      applications: [:crypto, :ranch, :cowboy] ]
  end

  defp deps do
    [ { :cowboy,    github: "extend/cowboy" },
      { :mimetypes, github: "spawngrid/mimetypes" },
      { :genx,      github: "yrashk/genx" },
      # TODO, move back to cblage after 0.10 supported.
      { :json,      github: "mathieul/elixir-json" } ]
  end
end
