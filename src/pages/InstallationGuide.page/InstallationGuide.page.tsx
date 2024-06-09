import PageLayout from "../../layout/Page.layout/Page.layout"

const InstallationGuidePage = () => {
  return (
    <PageLayout className="installation-guide-page">
      <h2>how to install keyboard layout on windows</h2>
      <ul>
        <li>
          <p>Export the keyboard layout by pressing on export button on the keyboard page</p>
          {/* <img src="../../assets/guideImages/export.png" alt="" /> */}
        </li>
        <li>
          <p>
            Installl{" "}
            <a
              href="https://www.microsoft.com/en-us/download/details.aspx?id=102134"
              target="_blank"
            >
              Microsoft Keyboard Layout Creator Tool 1.4
            </a>{" "}
          </p>
        </li>
        <li>Open MSKLC</li>
        <li>
          Click on File {">>"} Load Source File and select exported layout (it will be a .klc file)
        </li>
        <li>Click on Project {">>"} Test Keyboard Layout and check if it wor</li>
        <li>
          Click on Project {">>"} Build DLL and Setup Package and select exported layout (it will be
          a .klc file)
        </li>
        <li>Open newly created directory and open setup.exe</li>
        <li>After installing layout go to Language Preferences {">>"} Preferred languages</li>
      </ul>
    </PageLayout>
  )
}

export default InstallationGuidePage
