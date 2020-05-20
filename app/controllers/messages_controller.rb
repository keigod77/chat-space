class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
  end
１
  def create
    @message = Message.create(message_params)
    respond_to do |format|
      format.json
    end
  end

  private

  def message_params
    params.require(:message).permit(:content, :image,).merge(user_id: current_user.id, group_id: @group.id)
  end
  
  def set_group
    @group = Group.find(params[:group_id])
  end

end
