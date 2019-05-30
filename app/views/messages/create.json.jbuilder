json.user_name  @message.user.name
json.created_at  @message.created_at
json.id  @message.id
json.(@message, :content, :image)