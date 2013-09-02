defmodule ElChat.Handlers.ChatTest do
  use ExUnit.Case
  alias ElChat.Handlers.Chat

  test "handle nick updated" do
    state = Chat.State.new
    json = JSON.encode(event: "nick_updated", nick: "Sirius")

    assert { :ok, [], new_state } =
      Chat.websocket_handle({:text, json}, [], state)

    assert "Sirius" == new_state.name
  end

  test "handle message" do
    state = Chat.State.new(name: "alan")
    msg_json = JSON.encode(event: "message", message: "WAT")

    assert { :ok, [], new_state } =
      Chat.websocket_handle({:text, msg_json }, [], state)

    assert 1 == new_state.sent
  end
end
