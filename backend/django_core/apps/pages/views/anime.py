from typing import TYPE_CHECKING, AnyStr

from django.http import HttpResponse
from django.shortcuts import render

from ..data.anime import anime, anime_episode, icons, latest_animes

if TYPE_CHECKING:
    from ..request import HtmxHttpRequest


async def anime_home_view(request: "HtmxHttpRequest") -> HttpResponse:
    if request.htmx:
        return render(
            request,
            "anime/index.html",
            context={"latest_animes": latest_animes},
        )

    return render(
        request,
        "anime/_layout.html",
        context={"icons": icons, "latest_animes": latest_animes},
    )


async def anime_explore_view(request: "HtmxHttpRequest") -> HttpResponse:
    if request.htmx:
        return render(request, "anime/explore/index.html")

    return render(request, "anime/_layout.html", context={"icons": icons})


async def anime_info_view(request: "HtmxHttpRequest", pk: int) -> HttpResponse:
    if request.htmx:
        return render(
            request,
            "anime/info/index.html",
            context={"anime": anime, "episode": anime_episode},
        )

    return render(request, "anime/_layout.html", context={"icons": icons})

async def anime_episode_view(request: "HtmxHttpRequest", mal_id: int, pk: int) -> HttpResponse:
    return HttpResponse("Episode")