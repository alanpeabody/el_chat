defmodule ElChat.Mixfile do
  use Mix.Project

  def project do
    [ app: :el_chat,
      version: "0.0.1",
      elixir: "~> 0.10.2-dev",
      deps: deps ]
  end

  # Configuration for the OTP application
  def application do
    [ mod: { ElChat, [] },
      applications: [:crypto, :ranch, :cowboy] ]
  end

  defp deps do
    [ { :cowboy, github: "extend/cowboy" },
      { :mimetypes, github: "spawngrid/mimetypes" } ]
  end
end
