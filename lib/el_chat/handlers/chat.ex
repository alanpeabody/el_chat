defmodule ElChat.Handlers.Chat do
  @behaviour :cowboy_websocket_handler

  @doc """
  Holds the state of the user currently connected via this web socket.
  """
  defrecord State, name: nil, joined_at: nil, sent: 0, recieved: 0, pid: nil

  @doc """
  Initializes the web socket handler
  """
  def init({:tcp, :http}, _request, _options) do
    { :upgrade, :protocol, :cowboy_websocket }
  end

  @doc """
  Initializes the web socket connection
  """
  def websocket_init(_transport_name, request, _options) do
    pid = self |> pid_to_list |> list_to_binary
    { :ok, request, State.new(pid: pid) }
  end

  @doc """
  Handles all events pushed to the websocket. Expects and converts JSON.
  Always replies.
  """
  def websocket_handle({:text, message}, request, state) do
    { :ok, json } = JSON.decode(message)
    handle_event(json["event"], json, request, state)
  end

  def websocket_handle(_data, request, state),        do: { :ok, request, state }

  def websocket_info(_info, request, state),          do: { :ok, request, state }

  def websocket_terminate(_reason, _request, _state), do: :ok


  defp handle_event("join", json, request, state) do
    state = state.name(json["name"]).joined_at(:calendar.universal_time)
    :gen_server.cast(:room, {:join, self, state.name})
    reply_with(:success, request, state)
  end

  defp handle_event("message", _json, request, state) do
    state = state.update_sent(&1 + 1)
    reply_with(:success, request, state)
  end

  defp handle_event(event, _json, request, state) do
    { :reply, {:text, JSON.encode(unknown_event: event)}, request, state }
  end

  defp reply_with(:success, request, state) do
    IO.inspect(state)
    { :reply, {:text, JSON.encode(state)}, request, state }
  end
end
