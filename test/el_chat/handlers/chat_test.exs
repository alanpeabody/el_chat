defmodule ElChat.Handlers.ChatTest do
  use ExUnit.Case
  alias ElChat.Handlers.Chat

  test "handle join" do
    state = Chat.State.new
    json_join = JSON.encode(event: "join", name: "alan")

    assert { :reply, {:text, _}, [], new_state } =
      Chat.websocket_handle({:text, json_join}, [], state)

    assert "alan" == new_state.name
  end

  test "handle message" do
    state = Chat.State.new(name: "alan")
    msg_json = JSON.encode(event: "message", message: "WAT")

    assert { :reply, {:text, _ }, [], new_state } =
      Chat.websocket_handle({:text, msg_json }, [], state)

    assert 1 == new_state.sent
  end
end
