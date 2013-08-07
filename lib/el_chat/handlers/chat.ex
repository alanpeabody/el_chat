defmodule ElChat.Handlers.Chat do
  @behaviour :cowboy_websocket_handler

  def init({:tcp, :http}, request, options) do
    { :upgrade, :protocol, :cowboy_websocket }
  end

  def websocket_init(transport_name, request, options) do
    { :ok, request, :undefined_state}
  end

  def websocket_handle({:text, message}, request, state) do
    { :reply, {:text, "CopyCat: #{message}"}, request, state }
  end

  def websocket_handle(_data, request, state),        do: { :ok, request, state }

  def websocket_info(_info, request, state),          do: { :ok, request, state }

  def websocket_terminate(_reason, _request, _state), do: :ok


end
#init({tcp, http}, Req, Opts) ->
  #{upgrade, protocol, cowboy_websocket}.

#websocket_init(TransportName, Req, _Opts) ->
  #erlang:start_timer(1000, self(), <<"Hello!">>),
  #{ok, Req, undefined_state}.

#websocket_handle({text, Msg}, Req, State) ->
  #{reply, {text, << "That's what she said! ", Msg/binary >>}, Req, State};

#websocket_handle(_Data, Req, State) ->
  #{ok, Req, State}.

#websocket_info({timeout, _Ref, Msg}, Req, State) ->
  #erlang:start_timer(1000, self(), <<"How' you doin'?">>),
  #{reply, {text, Msg}, Req, State};

#websocket_info(_Info, Req, State) ->
  #{ok, Req, State}.

#websocket_terminate(_Reason, _Req, _State) ->
  #ok.
