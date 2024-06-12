## React Breadcrumb Components

```jsx
import Container from "@/components/Container";

const Breadcrumb = ({ items }) => {
  return (
    <Container>
      <nav aria-label="breadcrumb" className="py-4 lg:py-6">
        <ol className="flex items-center gap-2">
          {Object.keys(items).map((key, index, arr) => {
            const isLast = index === arr.length - 1;
            return (
              <li
                key={key}
                className={`hover:underline ${isLast ? "active" : ""}`}
                aria-current={isLast ? "page" : undefined}
              >
                {!isLast ? (
                  <>
                    <a href={items[key].url} className="mr-2">{items[key].label}</a>/
                  </>
                ) : (
                  items[key].label
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </Container>
  );
};

export default Breadcrumb;
```