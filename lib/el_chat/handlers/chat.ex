defmodule ElChat.Handlers.Chat do
  @behaviour :cowboy_websocket_handler
  alias ElChat.Room

  @moduledoc """
  The ElChat Chat Handler. Upgrades http connections to web socket protocol.
  Manages all interaction between Elixir and JS via the web socket.
  """

  defrecord State, name: nil, joined_at: nil, sent: 0, received: 0

  def init({:tcp, :http}, _request, _options) do
    { :upgrade, :protocol, :cowboy_websocket }
  end

  def websocket_init(_transport_name, request, _options) do
    state = State.new(joined_at: :calendar.universal_time)
    Room.join(self)
    { :ok, request, state }
  end

  @doc """
  Handles all events pushed from javascript via the websocket.
  Expects and converts JSON.
  """
  def websocket_handle({:text, message}, request, state) do
    { :ok, json } = JSON.decode(message)
    event = binary_to_atom(json["event"], :utf8)
    websocket_receive(event, json, request, state)
  end

  defp websocket_receive(:nick_updated, json, request, state) do
    state = state.name(json["nick"])
    Room.nick_updated(self, state.name)
    {:ok, request, state }
  end

  defp websocket_receive(:message, json, request, state) do
    state = state.update_sent(&1 + 1)
    Room.message(self, json["body"])
    {:ok, request, state }
  end


  @doc """
  Handles all messages pushed from Elixir. Sends JSON via websocket.
  """
  def websocket_info(event, request, state) do
    state = state.update_received(&1 + 1)
    { :reply, { :text, websocket_reply(event) }, request, state }
  end

  defp websocket_reply({:message, user_pid, nick, body}) do
    JSON.encode(
      event: :message,
      body:  body,
      pid:   pid_to_json(user_pid),
      nick:  nick,
      at:    :calendar.universal_time
    )
  end

  defp websocket_reply({:nick_updated, pid, nick}) do
    JSON.encode(
      event: :nick_updated,
      pid:   pid_to_json(pid),
      nick:  nick,
      at:    :calendar.universal_time
    )
  end

  defp websocket_reply({:joined, pid, nick}) do
    JSON.encode(
      event: :joined,
      pid:   pid_to_json(pid),
      nick:  nick,
      at:    :calendar.universal_time
    )
  end

  defp websocket_reply({:left, pid}) do
    JSON.encode(
      event: :left,
      pid: pid_to_json(pid),
      at: :calendar.universal_time
    )
  end

  def websocket_terminate(_reason, _request, _state) do
    Room.leave(self)
    :ok
  end

  defp pid_to_json(pid), do: pid |> pid_to_list |> list_to_binary
end
