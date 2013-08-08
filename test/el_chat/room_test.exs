defmodule ElChat.RoomTest do
  use ExUnit.Case
  alias ElChat.Room

  test "Joining adds user" do
    assert :ok = :gen_server.cast(:room, {:join, self, "alan"})
    assert [{self, alan}, _] = Dict.to_list(Room.clients)
  end

  test "Sending message to server" do
    assert :ok = Room.send_message("testing")
  end

end
