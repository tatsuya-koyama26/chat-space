class Api::MessagesController < ApplicationController
  def index
    @message = Message.new
    @messages = @group.messages.includes(:user).where('id > ?', params[:id])
  end
end