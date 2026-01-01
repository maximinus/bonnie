1. **Run behave from VS Code**

   * Command palette actions: *Run all features*, *Run current feature file*, *Run scenario under cursor*.
   * Auto-detect workspace venv / interpreter and run `python -m behave ...`.

2. **Gherkin syntax polish**

   * Better file association / language mode for `.feature`.
   * Snippets for `Scenario Outline`, `Examples`, common step phrases.

3. **Step definition “jump to implementation” (basic)**

   * If cursor is on a step line, parse python AST to find the step definition.
   * Open the file at the right point

4. **Create step stub**

   * If a step has no match, generate a skeleton in a chosen `steps/*.py` file:

     * `@when("I do X")` + `def step_impl(context): raise NotImplementedError()`.

5. **Tag tooling**

   * Toggle tags on scenario/feature (`@wip`, `@smoke`).
   * “Run with this tag” from right-click.

6. **Outline / breadcrumbs for feature files**

   * Tree view: Feature → Scenarios → Steps.
   * Click navigates to location.
   * Icons to run tests from tree view. Shows results of last run.

8. **CodeLens**

   * “Run Scenario”, “Debug Scenario”, above each scenario/scenario outline.
   * Show last run duration / pass-fail next to it.

9. **Step argument insights**

    * Recognize common parameter styles (regex groups, `{param}` style if used, numbers/strings).
    * Show quick hover: “Matches: step_impl in steps/login.py”.

10. **Undefined steps workflow**

    * After a run, parse behave output for undefined steps and offer “Generate all missing step stubs”.
    * Place them in the right module based on heuristics (folder/feature name/tag).

11. **Feature/step linting (basic)**

* Highlight:

  * Steps that don’t resolve to any implementation.
  * Duplicate step definitions that both match the same text.
  * Empty `Examples` tables, inconsistent column counts.

12. **Configuration profiles**

* Support `behave.ini`, `setup.cfg`, `pyproject.toml` behavior settings.
* UI to select profiles and persist them per-workspace.

13. **Formatter / auto-fixers**

* Sort tags, normalize whitespace, align `Examples` tables.
* Convert “And/But” usage consistently (optional rules).

14. **Refactors**

* Rename a step phrase safely across feature files *and* step definitions.
* Extract repeated step sequences into a Scenario/Background template (guided refactor).

15. **Autocomplete step text**

* As you type in a `.feature` file, suggest existing step phrases from implementations.
* Include parameter hints and show which module it comes from.

