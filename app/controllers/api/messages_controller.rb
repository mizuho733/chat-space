class Api::MessagesController < ApplicationController
  def index
    @group = Group.find(params[:group_id])
    @messages = @group.message.where('id > ?', params[:id])
  end
end
