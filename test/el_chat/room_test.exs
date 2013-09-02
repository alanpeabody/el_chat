defmodule ElChat.RoomTest do
  use ExUnit.Case
  alias ElChat.Room

  setup do: Room.join(self)
  teardown do: Room.leave(self)

  test "Joining adds Anonymous user" do
    test_pid = spawn fn ->
      Room.join(self)
    end
    assert_receive {:joined, ^test_pid, "Anonymous"}
    assert Dict.has_key?(Room.clients, test_pid)
  end

  test "Leaving room" do
    test_pid = spawn fn ->
      Room.join(self)
      Room.leave(self)
    end
    assert_receive {:left, ^test_pid}
    assert !Dict.has_key?(Room.clients, test_pid)
  end

  test "Updating Nick" do
    test_pid = spawn fn ->
      Room.join(self)
      Room.nick_updated(self, "Sirius")
      Room.leave(self)
    end
    assert_receive {:nick_updated, ^test_pid, "Sirius"}
  end

  test "Sending message to server" do
    test_pid = spawn fn ->
      Room.join(self)
      Room.message(self, "Testing")
      Room.leave(self)
    end
    assert_receive {:message, ^test_pid, "Anonymous", "Testing"}
  end

  test "Sending message to server without joining" do
    test_pid = spawn fn ->
      Room.message(self, "Testing")
    end
    refute_receive {:message, ^test_pid, "Anonymous", "Testing"}
  end
end
