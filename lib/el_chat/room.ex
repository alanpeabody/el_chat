defmodule ElChat.Room do
  use GenServer.Behaviour

  defrecord State, clients: HashDict.new, message_count: 0

  def start_link do
    :gen_server.start_link({ :local, :room }, __MODULE__, State.new, [])
  end

  def init(state) do
    { :ok, state }
  end

  def handle_cast({ :join, pid, name }, state) do
    state = state.update_clients fn(clients) ->
      Dict.put(clients, pid, name)
    end
    { :noreply, state }
  end

  def handle_cast({ :message, message }, state) do
    Enum.each state.clients, fn({pid, _name}) ->
      :gen_server.call(pid, {:message, message})
    end
    state = state.update_message_count(fn(val) -> val + 1 end)
    { :noreply, state }
  end

  def send_message(message) do
    :gen_server.cast(:room, {:message, message})
  end

  def handle_call(:clients, _from, state) do
    { :reply, state.clients, state }
  end

  def clients do
    :gen_server.call(:room, :clients)
  end
end
