export function onRequest(event) {
    event.replaceResponse(async () => {
      async function fetchContentJSON() {
        const response = await fetch(
          `https://css-tricks.com/wp-json/wp/v2/posts`
        );
        const data = await response.json();
        return data;
      }

      let response;
      let post;

      fetchContentJSON().then((data) => {
        post = data[0];
      });

      response = new Response(
        `
        <h1>${post.title}</h1>
        ${post.excerpt.rendered}
        `,
        {
          headers: {
            "content-type": "text/html",
          },
          status: 200,
        }
      );

      return response;
    });
}
