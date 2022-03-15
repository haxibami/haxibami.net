import { LinkWidgetMeta } from "lib/interface";
import { JSDOM } from "jsdom";

const linkStorer = async (content: string) => {
  const lines = content.split("\n");
  const links = [] as string[];

  lines.map((line) => {
    if (line.indexOf("http://") === 0) links.push(line);
    if (line.indexOf("https://") === 0) links.push(line);
  });

  let cardDatas = [] as LinkWidgetMeta[];
  const temps = await Promise.all(
    links.map(async (link) => {
      const metas = await fetch(link)
        .then((res) => res.text())
        .then((text) => {
          const metaData: LinkWidgetMeta = {
            url: link,
            title: "",
            description: "",
            image: "",
            icon: "",
          };
          const doms = new JSDOM(text);
          const metas = doms.window.document.getElementsByTagName("meta");
          const links = doms.window.document.getElementsByTagName("link");

          for (let i = 0; i < metas.length; i++) {
            let pro = metas[i].getAttribute("property");
            const imgreg = /^(?=.*image)(?!.*alt)(?!.*height)(?!.*width).*$/;
            if (typeof pro == "string") {
              if (pro.match("title"))
                metaData.title = metas[i].getAttribute("content") ?? "";
              if (pro.match("description"))
                metaData.description = metas[i].getAttribute("content") ?? "";
              if (pro.match(imgreg))
                metaData.image = metas[i].getAttribute("content") ?? "";
            }
            pro = metas[i].getAttribute("name");
            if (typeof pro == "string") {
              if (pro.match("title"))
                metaData.title = metas[i].getAttribute("content") ?? "";
              if (pro.match("description"))
                metaData.description = metas[i].getAttribute("content") ?? "";
              if (pro.match(imgreg))
                metaData.image = metas[i].getAttribute("content") ?? "";
            }
          }
          metaData.icon = metaData.image;
          for (let i = 0; i < links.length; i++) {
            const pro = links[i].getAttribute("rel");
            if (typeof pro == "string") {
              if (pro.match("icon")) {
                const tmp = links[i].getAttribute("href") ?? metaData.image;
                if (tmp.indexOf("/") == 0) {
                  const host =
                    metaData.url.indexOf("/", 8) != -1
                      ? metaData.url.slice(8, metaData.url.indexOf("/", 8))
                      : metaData.url.slice(8);
                  metaData.icon = "https://" + host + tmp;
                } else {
                  metaData.icon = tmp;
                }
              }
            }
          }
          return metaData;
        });
      return metas;
    })
  );

  cardDatas = temps.filter((temp) => temp !== undefined);

  return cardDatas;
};

export default linkStorer;
