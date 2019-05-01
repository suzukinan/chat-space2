json.id        @message.id
json.content   @message.content
json.date      @message.created_at.strftime("%Y/%m/%d %H:%M")
json.user_name @message.user.name
json.image     @message.image.url

# 以下応用カリキュラムの回答記載

# json.(@message, :content, :image)
# json.created_at format_posted_time(@message.created_at)
# json.user_name @message.user.name
# #idもデータとして渡す
# json.id @message.id
