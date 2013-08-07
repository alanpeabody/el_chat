defmodule ElChat.Handlers.Chat do
  @behaviour :cowboy_websocket_handler

  defrecord State, name: nil, joined_at: nil, sent: 0, recieved: 0, pid: nil

  def init({:tcp, :http}, request, options) do
    { :upgrade, :protocol, :cowboy_websocket }
  end

  def websocket_init(transport_name, request, options) do
    pid = self |> pid_to_list |> list_to_binary
    { :ok, request, State.new(pid: pid) }
  end

  def websocket_handle({:text, message}, request, state) do
    { :ok, json } = JSON.decode(message)
    handle_event(json["event"], json, request, state)
  end

  def websocket_handle(_data, request, state),        do: { :ok, request, state }

  def websocket_info(_info, request, state),          do: { :ok, request, state }

  def websocket_terminate(_reason, _request, _state), do: :ok

  def handle_event("join", json, request, state) do
    state = state.name(json["name"]).joined_at(:calendar.universal_time)
    reply_with(:success, request, state)
  end

  def handle_event("message", json, request, state) do
    state = state.update_sent(&1 + 1)
    reply_with(:success, request, state)
  end

  def handle_event(event, json, request, state) do
    { :reply, {:text, JSON.encode(unknown_event: event)}, request, state }
  end

  defp reply_with(:success, request, state) do
    IO.inspect(state)
    { :reply, {:text, JSON.encode(state)}, request, state }
  end

end
