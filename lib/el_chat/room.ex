defmodule ElChat.Room do
  use GenServer.Behaviour
  import GenX.GenServer

  @moduledoc """
  The ElChat room manager/dispatcher. All actions are managed by this process.
  """

  defrecord State, clients: HashDict.new, message_count: 0

  def start_link do
    :gen_server.start_link({ :local, :room }, __MODULE__, State.new, [])
  end

  def init(state) do
    { :ok, state }
  end

  @doc """
  Adds client pid to state, broadcast join event
  Exported as Room.join(pid)
  """
  defcast join(client_pid), state: state, export: :room do
    state = state.update_clients fn(clients) ->
      Dict.put(clients, client_pid, "Anonymous")
    end
    broadcast state.clients, { :joined, client_pid, "Anonymous" }
    { :noreply, state }
  end

  @doc """
  Removes client pid, broadcast leave event"
  Exported as Room.leave(pid)
  """
  defcast leave(client_pid), state: state, export: :room do
    state = state.update_clients fn(clients) ->
      Dict.delete(clients, client_pid)
    end
    broadcast state.clients, { :left, client_pid }
    { :noreply, state }
  end

  @doc """
  Update nick for given pid, broadcast nick change
  Exported as Room.nick_updated(pid, "new nick")
  """
  defcast nick_updated(client_pid, nick), state: state, export: :room do
    state = state.update_clients fn(clients) ->
      Dict.put(clients, client_pid, nick)
    end
    broadcast state.clients, { :nick_updated, client_pid, nick }
    { :noreply, state }
  end

  @doc """
  Broadcast chat message to all clients
  Exported as Room.message(pid, "message body")
  """
  defcast message(client_pid, body), state: state, export: :room do
    if client_name = state.clients[client_pid] do
      broadcast state.clients, { :message, client_pid, client_name, body }
      state = state.update_message_count(&1 + 1)
    end
    { :noreply, state }
  end

  defcall clients, state: state, export: :room do
    { :reply, state.clients, state }
  end

  defp broadcast(clients, message) do
    # Spawn a process to do the broadcasting, leaving room to respond to next
    # message. More efficient with many users.
    spawn fn ->
      Enum.each clients, fn({pid, _}) ->
        pid <- message
      end
    end
  end
end
