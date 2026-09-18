function AboutPage() {
  return (
    <main className="page-container simple-page">
      <section className="simple-page-card">
        <p className="eyebrow">About the app</p>

        <h1>About Todo List</h1>

        <p className="simple-page-description">
          This Todo List application helps users manage
          their tasks in a simple and organized way.
        </p>

        <div className="simple-page-section">
          <h2>Features</h2>

          <ul className="simple-page-list">
            <li>Create and manage todos</li>
            <li>Track completed and active todos</li>
            <li>Filter todos by status</li>
            <li>User authentication</li>
          </ul>
        </div>

        <div className="simple-page-section">
          <h2>Technologies</h2>

          <ul className="simple-page-list">
            <li>React</li>
            <li>React Router</li>
            <li>Vite</li>
          </ul>
        </div>
      </section>
    </main>
  );
}

export default AboutPage;