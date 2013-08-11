defmodule ElChat do
  use Application.Behaviour

  # See http://elixir-lang.org/docs/stable/Application.Behaviour.html
  # for more information on OTP Applications
  def start(_type, _args) do

    dispatch = :cowboy_router.compile([
      {:_, [
        {"/",             :cowboy_static,       single_page_app},
        {"/chat",         ElChat.Handlers.Chat, []},
        {"/static/[...]", :cowboy_static,       assets}
      ]}
    ])

    {:ok, _} = :cowboy.start_http(:http, 100, [port: 8080], [env: [dispatch: dispatch]])

    ElChat.Supervisor.start_link
  end

  defp single_page_app do
    [ {:directory, {:priv_dir, :el_chat, []}},
      {:file, "index.html"},
      {:mimetypes, {Module.function(:mimetypes, :path_to_mimes, 2), :default}} ]
  end

  defp assets do
    [ {:directory, {:priv_dir, :el_chat, ["static"]}},
      {:mimetypes, {Module.function(:mimetypes, :path_to_mimes, 2), :default}} ]
  end
end
