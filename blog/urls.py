from django.urls import path
from . import views
from .views import PostDetailView, CommentUpdateView, CommentDeleteView

app_name = 'blog'

urlpatterns = [
    # Blog - Homepage
    path('', views.PostList.as_view(), name='post_list'),
    # Post detail page
    path('<slug:slug>/',
        PostDetailView.as_view(), name='post_detail'),
    # New path for comment_view
    path('post/<slug:slug>/comment/', views.comment_view, name='comment_view'),
    # New path for edit_comment
    path('comment/<int:pk>/edit/', CommentUpdateView.as_view(), name='edit_comment'),
    # New path for delete_comment
    path('comment/<int:pk>/delete/', CommentDeleteView.as_view(), name='delete_comment'),
    # New pathfor likes
    path('like/<int:post_id>/', views.like_post, name='like_post'),
]
