defmodule ElChat.RoomTest do
  use ExUnit.Case
  alias ElChat.Room

  test "Joining adds user" do
    test_pid = self
    assert :ok = Room.join(test_pid, "alan")
    assert [ {^test_pid, "alan"} | _ ] = Dict.to_list(Room.clients)
  end

  test "Sending message to server" do
    assert :ok = Room.message("testing", "alan")
  end

end
