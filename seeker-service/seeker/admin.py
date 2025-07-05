from django.contrib import admin

from seeker.models import Resume, SeekerProfile, Experience


class CustomResumeAdmin(admin.ModelAdmin):
    list_display = ('id', 'resume_title')


admin.site.register(SeekerProfile)
admin.site.register(Resume, CustomResumeAdmin)
admin.site.register(Experience)
