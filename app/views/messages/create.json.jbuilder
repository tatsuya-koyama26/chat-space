json.user_name  @message.user.name
json.time  @message.created_at
json.id  @message.id
json.(@message, :content, :image)