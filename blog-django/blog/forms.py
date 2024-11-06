from django import forms
from django.contrib.auth.models import User
from .models import Post


class UserRegistrationFrom(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)
    password_confirm = forms.CharField(widget=forms.PasswordInput, label='Confirm password.')

    class Meta:
        model = User
        fields = ["username", "email", "password"]

        def clean(self):
            cleaned_data = super().clean()
            password = cleaned_data.get("password")
            password_confirm = cleaned_data.get("password_confirm")
            if password != password_confirm:
                raise forms.ValidationError("Password do not match.")
            return cleaned_data
        
        
class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ["title", "content"]

        