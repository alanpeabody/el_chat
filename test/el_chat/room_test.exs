defmodule ElChat.RoomTest do
  use ExUnit.Case
  alias ElChat.Room

  test "Joining adds user" do
    test_pid = self
    Room.join(test_pid, "alan")
    assert Dict.has_key?(Room.clients, test_pid)
    assert "alan" == Room.clients[test_pid]
  end

  test "no name, no chat" do
    Room.reset_clients
    Room.join(self, "")
    assert HashDict.new == Room.clients
  end

  test "Sending message to server" do
    Room.join(self, "alan")
    Room.message("testing", self)
    assert_receive {:message, _, "alan"}
  end

  test "not joined, not sent" do
    Room.reset_clients
    Room.message("testing", self)
    refute_receive {:message, _, _}
  end
end
