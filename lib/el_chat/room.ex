defmodule ElChat.Room do
  use GenServer.Behaviour
  import GenX.GenServer

  defrecord State, clients: HashDict.new, message_count: 0

  def start_link do
    :gen_server.start_link({ :local, :room }, __MODULE__, State.new, [])
  end

  def init(state) do
    { :ok, state }
  end

  defcast join(client_pid, ""), state: state, export: :room do
    { :noreply, state }
  end

  defcast join(client_pid, client_name), state: state, export: :room do
    state = state.update_clients fn(clients) ->
      Dict.put(clients, client_pid, client_name)
    end
    { :noreply, state }
  end

  defcast message(body, from), state: state, export: :room do
    if sender = state.clients[from] do
      Enum.each state.clients, fn({pid, _}) ->
        pid <- { :message, body, sender}
      end
      state = state.update_message_count(fn(val) -> val + 1 end)
    end
    { :noreply, state }
  end

  defcall clients, state: state, export: :room do
    { :reply, state.clients, state }
  end

  defcast reset_clients, state: state, export: :room do
    state = state.clients(HashDict.new)
    { :noreply, state }
  end
end
