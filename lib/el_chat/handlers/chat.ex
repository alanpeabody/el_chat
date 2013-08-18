defmodule ElChat.Handlers.Chat do
  @behaviour :cowboy_websocket_handler
  alias ElChat.Room

  defrecord State, name: nil, joined_at: nil, sent: 0, recieved: 0

  def init({:tcp, :http}, _request, _options) do
    { :upgrade, :protocol, :cowboy_websocket }
  end

  def websocket_init(_transport_name, request, _options) do
    { :ok, request, State.new }
  end

  @doc """
  Handles all events pushed from javascript via the websocket.
  Expects and converts JSON.
  """
  def websocket_handle({:text, message}, request, state) do
    { :ok, json } = JSON.decode(message)
    event = binary_to_atom(json["event"], :utf8)
    websocket_event(event, json, request, state)
  end

  defp websocket_event(:join, json, request, state) do
    state = state.name(json["name"])
    state = state.joined_at(:calendar.universal_time)
    Room.join(self, state.name)
    {:ok, request, state }
  end

  defp websocket_event(:message, json, request, state) do
    state = state.update_sent(&1 + 1)
    Room.message(json["body"], self)
    {:ok, request, state }
  end


  @doc """
  Handles all messages pushed from Elixir. Sends JSON via websocket.
  """
  def websocket_info({:message, message, user}, request, state) do
    json = JSON.encode(
      event: :message,
      body: message,
      name: user,
      at: :calendar.universal_time
    )
    { :reply, { :text, json }, request, state }
  end

  def websocket_terminate(_reason, _request, _state), do: :ok


end
