import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import parse from 'core/parser'

import Prose from 'components/mode/Prose'

const text = `#+title: Engineering
#+TODO: TODO(t) IN_SCOPING WIP IN_DEV IN_TEST | DONE(d@) CANCELLED(c@)

This place is where we track our engineering tasks and notes. We are dogfooding 🌭🐕 at the moment and working towards a point where this tool is friendly enough for others to use. Cleaning up the UI and providing some basic edit capability are some steps towards that goal.

#+begin_comment
TL;DR: Effectively this page is just a scrappy plaintext reader (of Org file to be precise, for the non-Org-mode readers on our team). You should be able to edit notes and tasks in a Confluence/Notion-like manner soon while simultaneously allowing teammembers on your team to interface with this knowledge-base and project-management setup through git and thus keep a full history of your project-management and knowledge-base on their machine.

I, for example, use this file inside of Emacs but am well aware that it would be torture to ask my fellow devs, let alone non-engineering colleagues, to fire up Emacs to get any work done. 😅

Using git underneat will allow us to facilitate nifty diffing features, time-machine like features or proper roll-backs when shit hits the fan. *Git is a helluva tool* and its time to expose more folks to the magic (magit users will appreciate the pun here) of git without exposing them to git mechanics.
#+end_comment

*Scroll down* to section [[*Background][Background]] for more information and *use the top-right* perspective-switch to switch between Prose and Kanban view on this document.

#+begin_comment
🙊 It's very scrappy but it's a little easier than sending ox-publish HTML or LateX exports over the wire (Slack or mail) or by asking folks to learn Emacs 🙊😅.
#+end_comment

* 🎯 Goal

Offer something that is way more fun/pleasant to use than Confluence and which is more tolerable than Notion. We want to bring the joy back in collaboration and are approaching this from a developer-first angle.

** 😭 Problem

Knowledge bases and project management tools are currently a source of frustration 😡 and devs are largely keeping notes in separate silos: in different note-taking tools or just on folders on their local machines for easy access simply because the current tools are clunky.

There is a *much intel lost* which hurts organizations! 📉

Removing the barriers to share knowledge helps teams keep relevant intel together 🧠 and should minimize knowledge loss when people are out-of-office or move on to other challenges. People should ideally ideate in their knowledge management/project-management tools and not be forced to document ideas there as a rote task after conception. We're out to break the barriers to make documenting and ideating together much easier -- challenge accepted. 😅

** 🌟 Vision

1. *Bring play back into collaboration*. Collaboration should be like dancing 💃 or playing a game of ball 🏀.

   There should be a sense of flow that one can enjoy while at it. We are figuring out how to bring that back into this category of tooling.

   Sometimes this means less rigor in the way we work together. There are no fixed lines within which to color! You can start with a basic text file and then gradually start jotting down ideas which grow to become tasks and then can get split up as we need in a very organic manner. Like claymolding -- but at a deskjob and without the sticky fingers.

2. *Facilitate people in their optimal modality* as we don't all consume information very well in the same way.

   Some of us need long texts to absorb ideas, some need to hear a voice (audio) and many we need visual/spatial representations to process information. Let's empower teams by providing them the modalities that make sense for whatever they're trying to do as the same data can be presented in different ways so we're doing that.

   You should be able to consume a knowledge base while strolling through the park listening to it podcast-style. You should be able to look at a document with tasks in a Kanban-like perspective or as a task dependency graph. We want knowledge-bases and project-management tooling to be more like a Rubik's cubes that you can turn around at study from different perspectives to improve your understanding. 🧩

   👨🏿‍💻 If you're a dev, we'll make it dead-easy to collaborate through the tools you already know very well like *plaintext and git*, so those notes of yours have no excuse to stay just on your box. Adding them to the knowledge base should be easier than stubbing a prototype and should happen with the toolbox within 🧰 which you play to your strengths.

3. *Simplify how we work together* by introducing some text assist capabilities for conveniences we haven't had access to before.

   When engineers draft complex technical texts, because this comes natural to them, we can utilize language models to attempt to paraphrase them for more junior, or perhaps, non-technical team members. Think Reddit's ELI5 [[https://www.reddit.com/r/explainlikeimfive/][r/ExplainlikeImFive]] or Wired's /One Concept in [[https://www.wired.com/video/series/5-levels][5 Levels]] of Difficulty/.

   Relieving folks from having to write for multiple audiences should lower the barrier for team members to enter their thoughts as quickly as they have them 💡. Less curation, more ping-ponging 🏓, as in, bouncing ideas back and forth but maybe also actual ping-pong if much time is being spared by bringing that flow back.

* Builds
** [22%] Prototype 01

This is the scrappy app (scr-*app* 🤣) that we are using to validate some early ideas.

#+begin_center
⚒️ Mason's code: Mark tasks as =DONE= only when they are merged into branch =hack=.
#+end_center

*** WIP [50%] Implement link following

**** DONE Remove anchors until ready to implement link-following :@vidbina:
:LOGBOOK:
- State "DONE"       from "TODO"       [2022-09-14 Wed 11:40] \\
  Already live!
:END:

Based on [[https://news.ycombinator.com/item?id=32765189][HN input]] by moeffju, we do readers a service by not displaying non-functional anchors and nudging them into trying to use them and getting lead astray. This is totally on-point so, let's remove all anchors until we sort out the link following.

**** DONE Fix TOC Storybook :@tijan:
:LOGBOOK:
- State "DONE"       from "TODO"       [2022-09-25 Sun 21:01] \\
  Done by @tijan and already merged. Had something to do with me resolving a merge to use a element instead of divs. 🤦🏿
:END:

The TOC is broken in Storybook and this [[https://stackoverflow.com/questions/59712474/set-up-storybook-to-work-with-next-jss-link-tag][Stack Overflow thread]] may provide some explanation of the issue at hand. Let's either fix the Storybook or figure out of this case is not testable in Storybook and then just make a note of this issues such that future developers know not to attempt testing click-through inside of Storybook.

**** DONE [66%] Design headline linking strategy :@vidbina:
:LOGBOOK:
- State "DONE"       from "TODO"       [2022-09-25 Sun 21:03] \\
  Mark headline linking as done for now.
:END:
***** Background

****** Requirements

******* Headline ids should be shareable between different people

Headlines ids can not be /randomly/ generated on a per-session basis (to map between ToC entries and headlines) as these id are not guaranteed to be the same during another session and therefore *not shareable*.

******* Headline ids should be shareable between different timestates

Bookmarked links need to survive non-destructive diffs (when just new content is added).

If the headline is removed then notify the user that the link has been removed at a given version, timepoint $t$, and provide an option to navigate to state $t$ to view the headline anyways

******* Headline ids should be valid element identifier as per W3C standard

(see https://html.spec.whatwg.org/#the-id-attribute and URL https://url.spec.whatwg.org/#concept-url)

- =id= requirements:
  - id must contain at least 1 character
  - id must be unique within the entire document
  - id must not contain ASCII whitespace
- are there other mechanisms to define/mark/reference entities?
  - =itemid= https://html.spec.whatwg.org/#global-identifiers-for-items

****** Approach

Rough outline how we will deal with headline identifiers.

******* Instantiation

This is the scenario where a headline is completely created within our tool.

#+begin_center
⚠️ Any headline created in another tool is not guaranteed to satisfy the characteristics of a headline populated by us so, we have to be graceful in how we handle headlines. 😅
#+end_center

- If headlines are *created* within the tool:
  - populate a unique =CUSTOM_ID= that can will always resolve to the headline as long as the headline or the =CUSTOM_ID= is not removed (see [[https://orgmode.org/manual/Internal-Links.html][Internal Links]])

- If headlines are *renamed* through the tool
  - maintain =CUSTOM_ID= if already present
  - populate =CUSTOM_ID= matching what may have been considered the previous headline by either of the following methods (first one wins):
    - dedicated target, https://orgmode.org/manual/Internal-Links.html
    - org-global-id
    - naive heading-to-id conversion logic

******* Referencing

This operation does not mutate the document in any form.

1. If =CUSTOM_ID= is defined, use this value
2. If [[https://orgmode.org/manual/Radio-Targets.html][radio target (see Org Manual)]] is set for the heading, use this value
3. Iterate over all headings and use naive heading-to-id conversion logic to identify headline
   - if found, index this link for this particular document version

******* Indexing

With indexing we keep track of headline identifiers throughout the lifetime of a document. This indexing should enable us to provide guidance to the user when a link is followed to a headline that may no longer be there or may have been modified (for example when a CUSTOM_ID is defined for a heading that was previously referenced through the id obtained by the heading-to-id conversion logic).

****** TODO Heading-to-id conversion logic

[[*Background][Background]]

******* Background
:PROPERTIES:
:ID:       904ea339-a66d-4c68-8278-7b80594f9e70
:END:

Org implements its own <<<heading-to-id conversion logic>>> that roughly works as follows:

According to https://orgmode.org/manual/Handling-Links.html#index-CUSTOM_005fID_002c-property-1,

- function =org-store-link= creates a link that can be inserted with function =org-insert-link=

  - variable =org-id-link-to-org-use-id=

    Controls whether to create/use an =ID= property for the link

    #+begin_src text
Non-nil means storing a link to an Org file will use entry IDs.

The variable can have the following values:

t     Create an ID if needed to make a link to the current entry.

create-if-interactive
      If ‘org-store-link’ is called directly (interactively, as a user
      command), do create an ID to support the link.  But when doing the
      job for capture, only use the ID if it already exists.  The
      purpose of this setting is to avoid proliferation of unwanted
      IDs, just because you happen to be in an Org file when you
      call ‘org-capture’ that automatically and preemptively creates a
      link.  If you do want to get an ID link in a capture template to
      an entry not having an ID, create it first by explicitly creating
      a link to it, using ‘C-c l’ first.

create-if-interactive-and-no-custom-id
      Like create-if-interactive, but do not create an ID if there is
      a CUSTOM_ID property defined in the entry.

use-existing
      Use existing ID, do not create one.

nil   Never use an ID to make a link, instead link using a text search for
      the headline text.

  This variable was introduced, or its default value was changed, in
  version 24.3 of Emacs.
  You can customize this variable.
    #+end_src

    See https://emacs.stackexchange.com/questions/51755/org-mode-link-files-with-ids-and-not-filenames for some relevant background information on how headline linking works in Emacs Org mode.

  - variable =org-id-method=

    Can be
    - symbol ~uuid~, the default
    - symbol ~ts~
    - symbol ~org~

    #+begin_src text
The method that should be used to create new IDs.

An ID will consist of the optional prefix specified in ‘org-id-prefix’,
and a unique part created by the method this variable specifies.

Allowed values are:

org        Org’s own internal method, using an encoding of the current time to
           microsecond accuracy, and optionally the current domain of the
           computer.  See the variable ‘org-id-include-domain’.

uuid       Create random (version 4) UUIDs.  If the program defined in
           ‘org-id-uuid-program’ is available it is used to create the ID.
           Otherwise an internal functions is used.

ts         Create ID’s based on timestamps as specified in ‘org-id-ts-format’.
    #+end_src

***** DONE [100%] Implement link following on headline links :@vidbina:
:LOGBOOK:
- State "DONE"       from "TODO"       [2022-09-25 Sun 21:02] \\
  Mark link following on headline links as done.
:END:

Following links is a core feature of any document. Let's provide some basic implementation. In the long-tail, we will need to keep track of heading references over the lifetime of a document just to ensure that we can provide useful guidance on how to resolve links (for example, inform a user to go back to a previous version of a document).

****** DONE Populate headline index with labels for headline links
:LOGBOOK:
- State "DONE"       from "TODO"       [2022-09-23 Fri 17:37] \\
  Index can be populated but we are populating it at the end of parsing instead of populating it on an ongoing basis. The reason for this is that I simply couldn't figure it out fast enough. Recursing over a document leaves the problem of sharing some document-global state to verify that human-friendly slugs do not collide. Trying to do this with map/reduce like mechanisms is problematic because the index state is copied along and there is a change that competing branches settle on the same slugs, allowing for collisions.
  
  Sleep deprivation and tunnel-vision are almost certainly in the mix here, so after a chat with @stefano we opted for the dead-simple approach of generating unique ids for now and then indexing them post-parse. This sucks because we now have to figure out how to lookup the human-friendly slugs in the rendering step. This will require us to pass some document-local state along to all the render functions. Just ideas. Maybe this is all BS and we'll find a better design after we've enjoyed quality sleep. 🤷🏿‍♂️
:END:

Links such as =[[*Headline]]= should basically work and resolve to the first match. So if there are multiple headlines with the same text, the first one is always the one reached by such a link.

We can link to a headline by providing the headline text sans the keyword, statistics cookie and tags. Observe list item 1 in the snippet below that demonstrates a valid link to the headline defined at the bottom of the snippet.

#+begin_src org
The following links will link to the section below:
1. [[*\[#B\] This is a *bold* heading][link]] works
2. [[*This is a *bold* heading][link]] does not work because the prio is missing

Now follows the section that we link into:

,* TODO [%] [#B] This is a *bold* heading :taga:tagb:

Here we are

,***** This isn't love, this is destiny

One of the previously working links was a trick. It was formatted incorrectly. The link below is simply because it is of a basic headline without any fancy bells or whistles.
[[*This isn't love, this is destiny][a link with interesting punctuation]]

,***** TODO [#A] COMMENT [100%] This isn't love, this is destiny :a:b:c:

The following link is trickier because it basically contains all the bells and whistles that headings can afford.
[[*This isn't love, this is destiny][correctly formatted link to self]]

,***** TODO [%] [#B] How are you

Below is a link to a trick heading. The order of the heading metadata is really important so here we have a link containing the priority metadata because we listed it in the wrong order in relation to the statistics cookie.
[[*\[#B\] How are you][wonky link to self because priority is listed before statistics cookie]]

,***** TODO [%] [#A] This isn't love, this is destiny :lyric:

Here is an example from the tests in the code. The uniorg parser seems to return all of the metadata along with the heading text =[%] [#A] This isn't love, this is destiny= but Org (in Emacs) only returns the escaped priority along with the heading text
[[*\[#A\] This isn't love, this is destiny][link]]

,* TODO [#A] This isn't love, this is destiny :lyric:

,***** TODO Populate shareable heading [%] ids

[[*Populate shareable heading ids][link]]
#+end_src

1. remove all statistics cookies
2. whitespace
   1. trim
   2. collapse multiple whitespace characters to single character

****** DONE Populate shareable heading ids
:LOGBOOK:
- State "DONE"       from "WIP"        [2022-09-25 Sun 20:37] \\
  Done with latest merge to hack (see https://gitlab.com/formation.tools/eng/proto-01/-/merge_requests/88)
- State "WIP"        from "TODO"       [2022-09-23 Fri 17:43] \\
  We are currently generating these ids through a helper function which runs through the flat list of headings and produces all slugs that we need. In an ideal world, I imagine populating an index while the document is being transformed (to our internal representation). Fundamentally, I'm torn on whether this information belongs in the internal representation of the headings. Part of me says that slugs, ids and linkTexts belong in the heading while another part says that we should just keep these in indices and provide a fast reference to the data (the heading).
:END:

Multiple headings which resolve to the same plaintext, should be numbered such that the id uniqueness constraints remains honored (a given id may only exist once).

We cannot use PRNG-generated heading ids because such ids will be different between sessions.

#+begin_src org
,* C

Should be referred to by id =c=
,* C+

Should be referred to by id =c-1=

,* C++

Should be referred to by id =c-2=

Kind of how GitHub ids README headings.
#+end_src

***** DONE Generate unique id for every parsed headline :@vidbina:
:LOGBOOK:
- State "DONE"       from "TODO"       [2022-09-23 Fri 17:46] \\
  Consider the scrappy part done!
:END:

The availability of unique ids for every parsed headline may simplify the implementation of linking. Within a session we can just use the session-scoped unique ids.

These ids will not be stored as data as they are only meant to be used within the intermediate representation to provide us quick references that are "guaranteed" to not collide within a session scope.

With such unique ids, we simplify the implementation of linking as we can just implement a lookup table that points headline links, =CUSTOM_ID= links, =ID= links or other linking methods to a single reference.

We'll stub a scrappy implementation and will optimize later. 😅

***** TODO Look into uniorg-slug and figure out if we should use this instead to honor ~CUSTOM_ID~ right away :@vidbina:

The current implementation is extremely scrappy but reading through the uniorg codebase is seems that uniorg-slug already covers part of this functionality in a much cleaner way.

**** [66%] Linking aids

Linking is a little bit easier now, but we are still lacking some visual aids/cues that can make is considerably easier for readers.

***** DONE Enable quick link copy from the heading itself :@tijan:
:LOGBOOK:
- State "DONE"       from "TODO"       [2022-09-27 Tue 13:00] \\
  @tijan came to the rescue 🏆 with https://gitlab.com/formation.tools/eng/proto-01/-/merge_requests/91
:END:

As a user, I want to be able to obtain the link to a heading by simply clicking it or by clicking some paragraph-icon (like ¶) or link icon alongside it (let's start with towards the end of the heading text).

Clicking a headline link shoulf link to itself and update the URL to that specific heading.

#+begin_comment
Clicking the link icon (whether it is ¶ or something else like the link icon to the left of headings on GitHub README pages) should link to the heading by id.
#+end_comment

Currently, I can only obtain this link by *through the TOC*. This is not very convenient when I am already scrolled to a certain part of the text and want to obtain some context by simply refering back to the ToC.

Link for a heading can be obtained by passing looking up the heading id in the =headingIdToSlugIndex= index on the document (type =FDocument=). See the TOC, where the lookup is being performed.

***** DONE Highlight highlighted ToC entry and Prose entry when navigated to from URL id :@tijan:
:LOGBOOK:
- State "DONE"       from "TODO"       [2022-09-28 Wed 21:45] \\
  Merging with 4d5dcbc3542b254fcff861ff5f14e1631202b13c
:END:

When we navigate to a given heading through clicking an entry in the TOC or by following a link such as =DOMAIN.TLD/PAGE/#heading-id=, where =heading-id= is the heading id, we want the active id to be highlighted in the view such that it is easier for the user to spot it.

***** TODO Highlight all parent ToC entries :@tijan:

Sometimes entries highlighted in the [[*Highlight highlighted ToC entry and Prose entry when navigated to from URL id][previous task]] are hidden because the parent may be collapsed. As a user, I want all parents highlighted until the topmost that isn't folded away. This should allow us to follow the trace when we are unfolding the ToC tree to find our intended entry.

#+begin_center
💡 It would be an idea to automatically unfold the tree to show the highlighted entry but this may be too disruptive if the user has folded the tree into a particular view for better overview. The idea of tracing the parents by higlighting them would be less disruptive to a reader's workflow.
#+end_center

**** TODO [33%] Implement internal link following :@vidbina:

Upon sorting out a [[*Design headline linking strategy][headline linking strategy]], we can implement functioning anchors or buttons wherever we have /links/. The links listed in the document and in the TOC would need to be updated to facilitate linking.

***** DONE Implement link following in ToC :@vidbina:
:LOGBOOK:
- State "DONE"       from "TODO"       [2022-09-23 Fri 17:47] \\
  The TOC now links through to the unique ids that we generate with the help of =nanoid= at the moment.
:END:

As an example for the later implementations.

***** TODO [33%] Index all headline links from prose :@vidbina:
:PROPERTIES:
:COOKIE_DATA: checkbox recursive
:END:

Internal document links in Org can refer to a headline by
- [X] the headline text
- [ ] the headline =ID= or by
- [ ] the =CUSTOM_ID=

Implement the indexing logic to facilitate heading lookup by the tokens mentioned above.

****** TODO [0%] Implement string processing needed for Heading fuzzy-link indexing
:PROPERTIES:
:COOKIE_DATA: checkbox recursive
:END:

The headline links in Org texts are actually called /fuzzy/ links and they fuzzy link values are derivatives of actual heading text.

The following points are copied from the subpoints below:

- [ ] all starting asterisks are collapsed to a single asterisk
- [ ] all brackets are escaped with =\=
- [ ] all statistics cookies are removed
- [ ] emojis remain in-tact

******* TODO Find source of truth in Org codebase :@vidbina:

Where in the Org-mode codebase is this implemented? Link to the source for future's reference.

******* [0%] Verify how [this] heading with an asterisk* links*

Observe that headline fuzzy links are formatted as follows:
[[*Verify how \[this\] heading with an asterisk* links*][Verify how [this] heading with an asterisk* links*]], where:
- [ ] all starting asterisks are collapsed to a single asterisk
- [ ] all brackets are escaped with =\=

Which means that we need to keep these changes in mind when indexing fuzzy links for headings.

******* [%] Verify how heading with [%] cookie links 🍪

Observe that headline fuzzy links are formatted as follows:
[[*Verify how heading with cookie links 🍪][Verify how heading with cookie links 🍪]]
- [ ] all statistics cookies are removed
- [ ] emojis remain in-tact

***** TODO Implement link following in Prose view :@tijan:

Link following in Prose view requires an [[*Index all headline links from prose][index to be populated]] which is a blocking task.

***** TODO Implement link following in Kanban view :@tijan:

**** TODO Implement image rendering :@vidbina:

Images in the document need to be rendered correctly. We have no images in this document yet to demonstrate this but this task is here to expand on this point.

**** TODO Implement breadcrumbs

Upon navigating to a headline, we want a breadcrumb to indicate the level at which the document is being observed. This breadcrumb view can be used as a method of narrowing the Kanban view as well.

*** TODO [#A] Align home-page and reader logic :@vidbina:

Right now, the home-page has been the thing we focused on, but we basically want the same behavior that we have on the home page on reader pages.

Handle SSR on the reader pages on par with the home-page and handle indexing on the reader pages on par with the home-page.

*** WIP [50%] Simplify file source access flow :UX:
**** DONE Add a clear /Follow URL/ CTA :@siarhei:
:LOGBOOK:
- State "DONE"       from "TODO"       [2022-10-06 Thu 08:01] \\
  Siarhei provided updated sketches at https://www.figma.com/file/DenroEWfValwUxKZJdtLW7/formation.tools-(Copy)?node-id=343%3A598&viewport=-1853%2C254%2C0.14
:END:

Remove emphasis from /Visit Source/ button and add a clear /Follow URL/ CTA (Call-to-Action).

***** Problem

As a user, I press the /Visit Source/ button expecting to be lead to the URL entered inside of the URL input box. This is a usability problem. We need a strong CTA near the URL input box that does exactly what a typical end-user would expect: lead one to the page that matches the entered URL.

💡 Try to enter =https://gitlab.com/formation.tools/eng/proto-01/-/raw/hack/README.org= into the URL input control to see what we mean. When pressing the blue button it only navigates to the source of the current page. The lack of a connection between that prominent button and the input text is a bit confusing. Following the entered text is only possibly by pressing =Enter=.

***** Definitions

- visit source :: leads a user out of the app to the authoritative source on the internet
- follow url :: leads the user to a in-app rendering of the URL that was provided (core use-case of the app)

***** Background

#+begin_comment
💡 The URL input textbox will very likely disappear once we allow people to login with their own GitHub and GitLab accounts. At that point, users will just navigate to the files they want through the sidebar menu. Since we're not there yet, the URL input box is an interim solution for now so it doesn't have to be perfect but should be at least "usable enough" -- as in, not confusing even the people who made it. We improvised input bar without the guidance from design so this explains the poor UX. Now we're trying to improve since we're hitting a point where the previous solution is no longer good enough.
#+end_comment

Users can currently press enter to continue upon entering some text into the URL text input. This isn't always very intuitive since there is a big blue button begging to be clicked right next to it. 😅 This button doesn't quite do what one is expecting, so we want there to be a button for the folks who wouldn't intuitively go for the enter key that does exactly what 80%+ would expect from such a a button without reading its label.

***** Suggestions

I'm thinking that a good starting point would be to move the /Visit Source/ button to an icon-only source button. Perhaps we can add it as an option to the perspective-selection button groun (where we can switch between Prose and Kanban views). But we're also open to a different design since I would understand if you argue it doesn't belong there since Kanban and Prose are both in-app perspectives and this /Visit Source/ action would lead one out of the app and perhaps deserved a different level of emphasis for that reason.

For reference, you can see how GitHub approached a similar problem on page https://github.com/rasendubi/uniorg/blob/master/README.md?plain=1 in the bar with the /Raw/ and /Blame/ buttons.

This bar has /Display the source blob/ and /Display the rendered blob/ buttons as well. The /Raw/ button does what we previously did with the /Visit Source/ button: it leads one to a different place on the internet that serves as the source of content. The /Display the source blob/ button just displays the source of the file in-app (never leaving the main app).

I'm not sure on whether we eventually 1) lead people out of our app to the source or if we 2) offer them a source-only representation in-app, but since we already handled option 1 with the /Visit Source/ button, we can just model the behavior of GitHub's /Raw/ button which does more or less the same thing. This approach keeps the implementation step easier as we already have the /Visit Source/ bit implemented and would simply need to restyle it. Rendering the source in-app, however; may require us to design another perspective for that behavior that we should schedule as a follow-up task and complete at a later point in time.

**** TODO Design source perspective :@siarhei:

In [[*Add a clear /Follow URL/ CTA][Add a clear /Follow URL/ CTA]], we touched upon eventually providing an in-app source-only view which would allow folks to see and copy the source code conveniently.

As a user, I want to be able to quickly copy the source code for a given page.

***** Background

We currently enable this by allowing users to follow a link to the /Raw/ representation (the exact version of the file that we read for parsing but this is technical detail so just ignore this). Going to the raw page, leads a user out of the app and the user has to copy the content by selecting it all (which is easy enough with keybindings) and copying it (also easy enough with keybindings).

***** Goal

We want there to be a perspective where the end-user can:

1. view the raw representation of the file without leaving the app
2. press a button to *copy* the raw representation (for future pasting)
3. press a button to leave the app and *go-to* the raw file at the authoritative source
4. optionally, press a button to leave the app and *go-to the git repo* that contains the file

   We just want an idea of what this could look like. We are likely not close to implementing anything like this yet.

*** TODO [0%] Handle basic invalid target cases more gracefully :UX:

In the spirit of /keeping things simple/ and not trusting any input, the user should expect some basic checks to prevent them from doing things that must not work.

**** TODO Fix timeout error when loading large files :bug:fix:
:PROPERTIES:
:ID:       8f0aaa91-7845-4dee-bb3e-7f256d7d13fe
:END:

Loading of files such as https://raw.githubusercontent.com/sachac/emacs-news/master/index.org currently times out with status 413 and the following logging output. 😰 

#+begin_src text
[GET] /r/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3NhY2hhYy9lbWFjcy1uZXdzL21hc3Rlci9pbmRleC5vcmc
18:53:40:72
Function Status: None
Edge Status: 500
Duration: 29697.85 ms
Init Duration: N/A
Memory Used: 741 MB
ID: fra1:fra1::4v64n-1663095220604-c6e5ca4e426f
User Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36

url aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3NhY2hhYy9lbWFjcy1uZXdzL21hc3Rlci9pbmRleC5vcmc
2022-09-13T18:54:05.666Z	f70e20ab-d399-4148-8d00-5a652bd01208	WARN	Warning: data for page "/r/[url]" is 7.16 MB which exceeds the threshold of 128 kB, this amount of data can reduce performance.
See more info here: https://nextjs.org/docs/messages/large-page-data
[ERROR] [1663095250473] LAMBDA_RUNTIME Failed to post handler success response. Http response code: 413.
#+end_src

This problem *may be solveable by incrementally parsing larger pages* and gradually streaming chunks of parsed content back to the client but I'm not sure how easy it would be to make this happen.

**** TODO Check URL before routing :UX:@tijan:

Avoid people from shooting themselves in the foot by implementing basic heuristics to check that GitHub and GitLab links are raw links:

- For GitLab that means:
  - matching =https://gitlab.com/GROUP/REPO_PATH/-/raw/BRANCH/FILE_PATH=
- For GitHub that means:
  - matching =https://raw.githubusercontent.com/USER/REPO/BRANCH/PATH=
  - matching =https://github.com/USER/REPO/raw/BRANCH/PATH=
  - matching =https://github.com/USER/REPO/blob/BRANCH/PATH?raw=true=

In case the links are not raw, present an alert for now with the error. We'll show something nicer in the future when we have time.

**** TODO Check that retrieved data is valid Org data :UX:@vidbina:

Right now we run HTML input through the Org parser if the URL was invalid and pointing towards a regular webpage. We should at the very least check if we can discern plaintext input from HTML input by checking the mimetypes in the response.

*** Design
**** TODO Organize components into an atomic design system :@stefano:

***** IN_TEST Configure for Storybook deployment to Chromatic :@stefano:

The objective is to have Storybook's publically accessible such that have a quick reference to use in conversations (on any channel). Sharing links around will make "talking about things" a bit easier.

Some use Netlify to deploy their Storybooks. For us it doesn't matter where we host these as long as it allows for public access and it a moderately friendly (ask me what this means over a beer 🍺) platform/tool.
: While watching OpenSauced videos I learned that @bdougie deploys Storybook to Netlify.

***** TODO Define new component file tree or taxonomy :@stefano:

We have a bunch of components now and considering that this will grow going forward, it is a good moment to organize our components structure a bit better. 

Look into [[https://atomicdesign.bradfrost.com/][atomic design]] for some guidance/ideas on how we can structure our components. We may already be "redefining" components (that may be atoms) in multiple places since it isn't always too clear what may already be there.

Update =title= fields in the Storybook stories to suggest a new taxonomy that breaks our component structure down into:
- atoms
- molecules
- organisms
- templates
- pages

[[https://atomicdesign.bradfrost.com/chapter-2/][Chapter 2]] of the Atomic Design book provides some guidance on what these taxons mean.

Some brainfarts on what triggered this task:
- see the public [[https://storybook.js.org/showcase/][example storybooks]] as an example of what would be helpful to have going forward. As a team, we want designers and developers to have a go-to reference that serves as our source of truth for components and design-related themes. To keep things snappy, this resource has to be open in the sense that we do not want to require folks to login somewhere in order to access it. That way, we simplify talking about things in public by simply passing links along.
- in the future we need clearer progress indicators for every "task" as I first noticed in the [[https://repliear.herokuapp.com/d/AxsPQpRgT2][Repliear]] demo app (which is inspired by the design of [[https://linear.app/docs/select-issues][Linear]]) where more than just color (green/red) is used to communicate a "tasks" status in the context of a workflow. Our current ToC and our Heading components display "workflow state" through the use of Tag components but it is likely that we will have to introduce a ~WorkflowStateIndicator~ component (or something with a much clearer name) to indicate this state through *a combination of color, shape and possibly text* (in views where there is enough room).

*** TODO Setup themes :@tijan:
*** [20%] Automated Testing :devtools:qa:
**** TODO Add test stage to Vercel pipeline :@jamba:

As a developer, I sometimes catch snapshot breakage when I'm trying to work on a new feature and this should be caught much earlier by the build pipelines.

Failures in test should not be discovered by developers but should be discovered by the build pipelines.

#+begin_center
⚠️ The current =hack= branch now contains a gitlab CI pipeline that runs in parallel to the external Vercel job. Let's figure out if we:

1. delay the Vercel job until the test stage in the GitLab CI pipeline passes. That way we don't waste compute on Vercel if the test pipeline fails and we block deploying code that has failing tests. I don't know if this is possible since this job is an external one and perhaps it is hard to influence it.

2. If idea 1 is too tricky, we can setup the Vercel token inside of Gitlab CI and build and deploy the app directly from GitLab CI (as opposed to from Vercel through an external job).

Open to ideas here though especially compelling cons for either of the approaches.
#+end_center

**** IN_TEST Setup Playwright to dev tooling :@jamba:

As a team, we need to have some tooling in place for E2E testing. Better to set this up sooner rather than later such that we can already start stubbing the first E2E cases to minimize the cost of manual click-through during development.

See https://nextjs.org/docs/testing#playwright

The first test case, should complete the following steps:
1. navigate to the home page
2. enter a https://gitlab.com/formation.tools/eng/proto-01/-/raw/hack/README.org into the URL input and submit
3. wait for the new page to get rendered
4. click on Resources item in TOC (table of contents)
5. verify that prose view scrolls to the Resources section

**** TODO Add E2E test suite to GitLab CI pipeline :@jamba:

As devs, we want E2E tests to automatically get run in a pipeline. Ideally, we have a way to obtain visual feedback from the pipeline as well.

Not sure if the GitLab CI runners are enough for this or if there is a service where we can run these test workloads (also on Safari, which would require a macOS environment which I think GitLab also offers so my gut tells me that GitLab CI should be up to the task). Perhaps we may have to opt for something like BrowserStack or https://www.lambdatest.com/ (see https://www.lambdatest.com/support/docs/playwright-tests-in-ci-cd/ for the CI/CD part and https://www.lambdatest.com/support/docs/gitlab-ci-integration-with-lambdatest/ for the Gitlab CI bit).

If we can extend GitLab CI to run the E2E suite let's do so! Otherwise, we need to get accounts setup at the service to try and adapt the GitLab CI pipeline to get this to work (if adaptation of the pipeline is even necessary).

Explore the different options (perhaps even my testing the tooling on test repos) to help us figure out how to best set either of these up for this project.

**** DONE Setup coverage tracking :@vidbina:

Setup Codecov for project because it is a FLOSS-friendly option so we'd happily give them our money.

See https://docs.codecov.com/docs/gitlab-tutorial for implementation details

**** TODO Fix Codecov reporting

The https://app.codecov.io/gitlab/formation.tools:eng/proto-01 page is not listing our coverage (it is only listed by going to [[https://app.codecov.io/gitlab/formation.tools:eng/proto-01/commit/4d5dcbc3542b254fcff861ff5f14e1631202b13c][commit-specific pages]]). My hunch is that codecov is having some trouble cataloging our coverage data because of our merging workflow which heavily uses fast-forward merges.

See [[https://twitter.com/vidbina/status/1575248368103718913?s=20&t=9fphl6YP8eKN2Lt9QFysyg][@vidbina Tweet to @codecov]] for a different phrasing of the issue as I observed it then.

***** Merging Workflow

We have a =main= branch which is deploys to production and a =hack= branch which deploys to staging.

We merge feature branches to =hack= (staging) and when this is done in some forge like GitLab (in our case) or GitHub, it a non-fast-forward merge into =hack= is made which will trigger a deployment to staging.

We maintain a single line between =hack= (staging) and =main= (production) so =main= is trailing hack until we decided that we can fast-forward its position. This means that we don't have unique revs for every event but often find our =hack= and =main= branches sharing the exact same point on the graph when everything is caught up.

Here is a visual breakdown:

#+begin_src txt
         main     hack
          |        |
mainline  o--o--o--o
                    \
feature              o----o <- HEAD of feature branch
#+end_src

Such a merge results into the following situation (note how the feature branch was merged into =hack=).

#+begin_src txt
         main              hack
          |                 |
mainline  o--o--o--o--------o--
                    \      /
feature              o----o
#+end_src

On a day-to-day basis, however; I don't always use GitLab's merge button to trigger merges but I may, start a =WIP= branch on my machine (actually called =vidbina/merge.hack= for me as I prefix all my merge-related branches with =vidbina/merge.= but =WIP= is shorter for the purpose of this description) starting from the upstream =hack= and then perform a non-fast-forward merge (like the forges do) locally. This workflow allows me  *to resolve conflicts more conveniently* and run some tests/experiments thereafter.

I may throwaway these local =WIP= branches if I mess things up or want to approach the merge slightly differently.

#+begin_src txt
         main     hack     WIP
          |        |        |
mainline  o--o--o--o--------o--
                    \      /
feature              o----o
#+end_src

Anyways, after confirming that the results are okay, I /fast-foward merge/ (using =git merge --ff=) =WIP= into =hack= such that they share the same rev and then I push =hack= upstream.

#+begin_src txt
                           hack
         main              WIP
          |                 |
mainline  o--o--o--o--------o--
                    \      /
feature              o----o
#+end_src

After the staging build has been out there without too much trouble, we catch up =main= through a fast-forward merge.

#+begin_src txt
                           main
                           hack
                           WIP
                            |
mainline  o--o--o--o--------o--
                    \      /
feature              o----o
#+end_src

***** TODO Refile Merging Workflow out of the task

Once the task is done and considering that the [[*Merging Workflow][merging workflow]] write-up is not too shabby, we should file it were devs can reference it more easily (like in the proto repo itself).

*** IN_SCOPING [0/5] Auth

Currently evaluating Auth0, NextAuth, Clerk.dev and ory.sh and optimizing for best ease of use and minimal ops/management load.

**** IN_SCOPING Prepare database :@vidbina:
**** TODO Facilitate login-with-GitLab
**** TODO Facilitate login-with-GitHub
**** TODO Facilitate login-with-Google

We first need to made a decision on how we deal with non-git data.

**** TODO Setup NextAuth for GitLab :@vidbina:
**** TODO Setup NextAuth for GitHub :@vidbina:
**** TODO Setup NextAuth for Google :@vidbina:
**** TODO Solve login to same space from different IdPs :@vidbina:

As a user, I want to be able to login with my GitHub account or my Google account and see the same data if I use the GitHub account for the same org as my Google account. For this to work, I need to be able to associate multiple ids from various IdPs to the same invididual.

*** [%] Spaces
*** IN_SCOPING [0%] Persistence
**** IN_SCOPING Facilitate text authoring/editing

Just grabbed coffee with Marijn Haverbeke from ProseMirror and CodeMirror to explore how to approach this problem and whether to focus on collaborative editing right away.

ProseMirror offers OT-based collaborative editing. See https://marijnhaverbeke.nl/blog/collaborative-editing.html and https://prosemirror.net/docs/guide/#collab for relevant background information.

#+begin_quote
💡 We can implement authoring/editing without auth or persistence by just allowing folks to copy/paste the source. Really bad UX but I'm just saying that we can implement the UX side of this experience without blocking it with back-end-ish concerns (auth and persistence/storage).
#+end_quote

**** TODO Implement commit-to-git
***** TODO Implement commit-to-GitHub repo
***** TODO Implement commit-to-GitLab repo
**** TODO Implement non-git storage
**** TODO Implement multiplayer session store

For collaborative editing (multiplayer mode) we will need to offer a storage overlay that facilitates ephemeral data (like collab session interactions) until these are solidified enough to convert into a change request/MR/PR by way a git commit.

Some of the options in consideration are replicache, liveblocks and Yjs (which is P2P but may still require some information overlay to coordinate session discovery).

*** TODO [50%] Adapt parsing options based on document input :@vidbina:
:PROPERTIES:
:ID:       542046cc-0783-4be1-bf6c-7a592d6e96e3
:END:

#+begin_comment
⚠️ This task is oddly unspecific. The core point here is that there are setting encoded in a document that we need to honor in our representation efforts. For now 
#+end_comment

The =defaultOptions= for the uniorg parser sets =todoKeywords= to =TODO= and =DONE= (see [[https://github.com/rasendubi/uniorg/blob/0970ebcb3040b10bea58aee7601b700320762420/packages/uniorg-parse/src/parse-options.ts#L31][src]]) which is in line with Org's defaults. Custom TODO keywords that are defined through the =TODO= keyword or its variants =TYP_TODO= are not being honored and thus these keywords are parsed as "just text".

Examine +how to make the parser options region dependent such that we can parse differently within limited scopes (for example parsing with certain keywords known for the scope of a section where these keywords are defined)+ how to implement honoring of TODO keywords that are defined to be *file-local*.

#+begin_comment
💡 Perhaps we can study the streaming API of uniorg to figure out to which extend we can modify the options data structure and whether this mechanism implements some stack such that we can pop out of a given context in order to continue parsing of a document.
#+end_comment
#+begin_comment
Streaming API won't help here as we need to sculpt/adapt/shape the document as we obtain more information. The streaming API may be helpful for the [[id:8f0aaa91-7845-4dee-bb3e-7f256d7d13fe][large file parsing timeout]] point.
#+end_comment

See https://github.com/rasendubi/uniorg/issues/53 with the following response to our issue:

#+begin_quote
Definitely in the scope of the project. This is also closely related to
#+OPTIONS as they also influence how file is parsed.

The main challenge with these is that they can occur anywhere in the file.
Options or todos might be specified on the last line of the file and they
should still affect all the lines above. (In emacs, I believe they set
buffer-local variables and re-fontify. That's why you have to C-c C-c when
you change options line.)

The easiest way to implement this in uniorg is to parse file twice. First
time to extract keywords, and second—with options configured from the first
parse.
#+end_quote

**** DONE Parse document twice to collect TODO sequences :workaround:hack:
:LOGBOOK:
- State "DONE"       from "TODO"       [2022-10-15 Sat 15:42] \\
  Already implemented.
:END:

Disclaimer: This is a sloppy solution but will definitely work for now. Let's just get this to work *reliably* even if slow and shittily implemented. 💩

I already considered just parsing $n$ lines prior to parsing the full document in order to minimize the workload and keep things "responsive" but this is not the prime objective at the moment.

Keywords that we need to check for TODO sequences are:
- ~TODO~
- ~SEQ_TODO~
- ~TYP_TODO~

**** TODO Inventorize which keywords are relevant for us to present documents correctly

See https://orgmode.org/worg/dev/org-syntax.html#Keywords for the definition of keyword. We need to parse 

**** 🦬 Yak Shaving/Background

Note that [[file:~/src/rasendubi/uniorg/packages/uniorg-parse/src/parse-options.ts::export const defaultOptions: ParseOptions = {][defaultOptions in parse-options.ts]] defines TODO and DONE as the default values for =todoKeywords=. According to a code-base grep, the only place to change the defaultOptions seems to be in the [[file:~/src/rasendubi/uniorg/packages/uniorg-parse/src/parser.ts::this.options = { ...defaultOptions, ...options };][constructor of the Parser in parser.ts]]. The implementation in [[https://github.com/rasendubi/uniorg/blob/master/packages/uniorg-parse/src/parser.ts][parser.ts]] doesn't seem to allow for updating of ~options~ during parsing.

*** TODO Setup stories to point towards a few real raw Org files :@tijan:

In order to simplify development and to avoid us having to switch between storybook tabs and dev page tabs, it would be nice to have a story for Prose and Board where the content is the [[https://gitlab.com/formation.tools/eng/engineering/-/raw/main/README.org][raw README file]] that we are displaying on the home page right now.

*** DONE Style fallback components :@tijan:@assutech:
:LOGBOOK:
- State "DONE"       from "TODO"       [2022-08-29 Mon 13:18] \\
  Merged with https://gitlab.com/formation.tools/eng/proto-01/-/merge_requests/50
:END:

- FallbackBlock, becomes =<pre>=
  - for example for tables

    #+begin_src org

| Name                  | Value |
|-----------------------+-------|
| A                     |    12 |
| A ladkajfsdlkfjalsdkf |   233 |
    #+end_src

- FallbackInline, becomes =<code>=
  - see [[https://tailwindui.com/components/application-ui/elements/buttons#component-109c4104d58d9fedfa8650dbe24c1ae8][TailwindCSS example]]

  - for example for links

    #+begin_src org
[[https://example.com][link]]
    #+end_src

**** TODO Build storyboards

- for block
  1. show example of the table (above)
  2. show just some random code
- for inline
  1. show example of a link (in list above)
  2. date
     - e.g.: [2022-08-24 Wed 16:43]

*** TODO Render all block using the Fallback component

Currently many blocks remain unrendered. This should be resolved by rendering all block-like components in a Fallback component as a interim quick-fix.

*** DONE Implements Date components :@tijan:@assutech:
:LOGBOOK:
- State "DONE"       from "TODO"       [2022-09-04 Sun 16:21] \\
  Just merged to mainline and added some notes in-source tagged to @tijan about restructuring the architecture to optimize DRY-ness of the setup.
:END:

- also maybe button
- inputs
  - time
  - date

*** DONE Implement Link components :@tijan:@assutech:
:LOGBOOK:
- State "DONE"       from "TODO"       [2022-08-31 Wed 15:51] \\
  Merged into mainline a few days ago
:END:

- maybe button
- inputs
  - URL [+ label] [+ description]

*** DONE Implement Tag component :@tijan:@assutech:
:LOGBOOK:
- State "DONE"       from "TODO"       [2022-08-31 Wed 15:51] \\
  Merged into mainline along with the Link component
:END:

- reference: see [[https://tailwindui.com/components/application-ui/elements/badges][Badges on TailwindCSS]]
- inputs
  - just a string

*** DONE Retrieve all top-level tasks :@vidbina:
:LOGBOOK:
- State "DONE"       from "TODO"       [2022-09-04 Sun 16:22] \\
  Implemented and merged to mainline
:END:

In order to populate the Kanban view (where the first TODO may not be part of a first-level heading), we want to be able to extract all top-level tasks from a document.

For the following snippet snippet we can list 3 top-level tasks, being:
- Task 1: Think about what to do
- Something in the future, not sure yet
  - Task 2: Procrastinate
  - Task 3: Figure out what is in the future

#+begin_src org
,* Background
,* Tasks
,** TODO Think about what to do
,** Something in the future, not sure yet
,*** DONE Procrastinate
,*** TODO Figure out what is in the future
,**** TODO Collect underpants
,**** TODO ...
,**** TODO Profit
,* Conclusion
#+end_src

Any of the subtasks should only be visible when navigating into that level by clicking on the parent card.

*** IN_SCOPING [0%] Display task progress
**** TODO Update uniorg to get statistics cookies :debt:@vidbina:

We contributed to this feature but haven't bothered to update yet. In order to display task progress, we'll need it so let's get on with it.

**** TODO Show Heading progress

As a user, I want some visual indicator of how far along something is.

Progress indicator has various modes:
- narrow :: which we can use where real-estate is a concern fixed-width (like in the TOC or inside of a Kanban card)
  - display a Linear-style progress circle
- wide :: which we can use where real-estate is not a major concern (like in a Heading that has enough width to spare)
  - display a progress bar

**** WIP Determine color-scheme to use to communicate progress :@siarhei:design:

As a user, I want progress color-coded to provide a quick sense of where things are.

In Emacs, completed or terminated tasks are rendered in green while ongoing tasks are rendered in red. This is sometimes a source of confusion because some may associate red with stopped and green with go given the usage of these colors in traffic lights and other problems (see [[*Show Heading progress][Show Heading progress]]) to provide a more fool-proof solution here -- something that is less prone to misunderstanding.

We want something that is instantly clear with just a split-second glance. Perhaps we need to rely on a combination of color and shapes.

**** TODO Figure out what to do with this :@vidbina:debt:

We probably want to gradually alter the color a WorkflowState in a workflow according to some gradient. Not clear what to do here yet. Ask design for input.

#+begin_quote
💡 See ~WorkflowStateColor~ in renderer.
#+end_quote

**** TODO Extract extreme states for a given workflow :@vidbina:

Terminating states are easy because we parse them into our data structure into ~workflows~ with the ~isActive~ property set to false.

Starting states are a bit trickier, but we can start by assuming that the first non-terminating state in a workflow are the starting state.

When multiple workflows are defined, always take the first of each workflow to indicate a starting state. So we should be able to support multiple starting states this way.

*** IN_SCOPING [0%] Multi-pane Layout
:PROPERTIES:
:COOKIE_DATA: todo recursive
:END:

As a reader, I may sometimes want to have content juxtaposed to simplify reading or x-ref-ing. Perhaps I want two instances of Prose (scrolled to different locations) side-by-side, perhaps I want a Prose view shown next to a Calendar view.

We need the basic mechanisms in place to facilitate this for experimentation.

**** TODO Implement resizable pane component :@tijan:

As a user, I want to be able to resize a pane to fit my needs.

The pane should be resizable in the following modes:
- fixed :: not resizable and fixed to 1x prose width
- quantized :: resizable in fixed steps of 1x or 1.5x prose width by dragging
- continuous :: flexibly/continuously resizable between 0.5x and 2x prose width by dragging

When dragging we want to have clear borders visibly to guide the end-user in understanding what the frame is that is being dragged.

Our first implementation should just render an empty Pane. Don't worry about the content for now.

**** TODO Migrate perspective control into the Pane

As a user, I want to be able to view content inside of a Pane and potentially be able to study multiple instances of a given perspective side-by-side.

Currently the control of perspective is global (in the navbar) and in order to do panes well, we want to delegate this control to the Pane level such that viewers of multiple panes can control the perspective of each pane within that pane itself.

#+begin_comment
If we don't provide pane-local perspective control, we will have to provide users to mechanism to control which pane they refer to when switching perspective in a global (in the top navbar) control. This will already confuse us as users, let alone another user.
#+end_comment

**** IN_SCOPING Implement pane-splitting

Earliest brainfart: Provide split-horizonally and split-vertically buttons somewhere in the pane to allow the user to split the pane how they want to. From that part on users can use the pane-local perspective controls to manage that pane.

***** TODO Implement split-pane-horizontally in pane controls
***** TODO Implement split-pane-vertically in pane controls
***** TODO Implement close-pane control
*** WIP [75%] Add fonts :@tijan:
:PROPERTIES:
:COOKIE_DATA: todo recursive
:END:

Not sure if the following links are relevant here:
- https://blog.logrocket.com/how-to-use-custom-fonts-tailwind-css/
- https://nextjs.org/docs/basic-features/font-optimization

**** TODO Add emoji font :@tijan:

Emojis are currently not consistently rendered. On my Linux box, I see a painful mess of just monochrome Wingdings-style emojis and the more colorful icons. Setting up an emoji font to ensure that everyone sees the same thing would improve consistency here and should be a small enough win for us to lock in.

Add https://fonts.google.com/noto/specimen/Noto+Color+Emoji

**** DONE [100%] Add text fonts
:LOGBOOK:
- State "DONE"       from "TODO"       [2022-09-28 Wed 13:57] \\
  Completed with https://gitlab.com/formation.tools/eng/proto-01/-/merge_requests/93
:END:

On different platforms the selected serif font will look different. In order to control the quality of the reading experience, let's pick a decent open font to use here.

It is important the the fonts have varying weights such that we can still distinguish from bold text when it is presented inside of a Headline which is already presented in bold.

***** DONE Add serif font
:LOGBOOK:
- State "DONE"       from "TODO"       [2022-09-28 Wed 13:56] \\
  Merged with https://gitlab.com/formation.tools/eng/proto-01/-/merge_requests/93
:END:

Here are the options approved by @siarhei:
- https://fonts.google.com/specimen/Roboto+Serif?query=Roboto+Serif
- https://fonts.google.com/specimen/Roboto+Slab?query=Roboto+Slab
- https://fonts.google.com/specimen/IBM+Plex+Serif?query=IBM+Plex+Serif
- https://fonts.google.com/noto/specimen/Noto+Serif?query=Noto+serif
- https://fonts.google.com/noto/specimen/Noto+Serif+HK?query=Noto+serif+hon

***** DONE Add sans-serif font
:LOGBOOK:
- State "DONE"       from "TODO"       [2022-09-28 Wed 13:56] \\
  Merged with https://gitlab.com/formation.tools/eng/proto-01/-/merge_requests/93
:END:

Here are the options approved by @siarhei:
- https://fonts.google.com/specimen/Inter?query=inter
- https://fonts.google.com/specimen/Poppins?query=Poppins
- https://fonts.google.com/specimen/Lato?query=Lato
- https://fonts.google.com/specimen/Raleway?query=Raleway
- https://fonts.google.com/specimen/Rubik?query=rubik

*** TODO [%] List Perspective
*** WIP [37%] Prose Perspective
**** TODO [0%] Implement Section folding

***** TODO Implement a Section component :@tijan:

Implement a section component that uses something like headless's Disclosure to make the entire section foldable.

***** TODO Render Section component in renderer :@tijan:

Currently the renderer doesn't render anything for a section (we just return an empty list). We may need to think through what rendering sections will "mean" since there are a lot of nested sections in a doc, so once we start rendering sections we should expect some fireworks. 🎆

Let's not worry about the explosions for now and just get this implemented! Once it's there it'll be my chore to figure out how to clean things up when merging the changes.

***** TODO Fold completed sections Prose :@tijan:

Minimize the noise in the docyment by folding all sections that are marked as =DONE=, same as [[*Fold completed headings in ToC][Fold completed headings in ToC]], above.

**** DONE Fold completed headings in ToC :@tijan:
:LOGBOOK:
- State "DONE"       from "TODO"       [2022-09-27 Tue 13:04] \\
  Implemented by @tijan with https://gitlab.com/formation.tools/eng/proto-01/-/merge_requests/92
:END:

Minimize the noise in the ToC by folding all the headings that are marked as =DONE= (=todoKeyword= from type =FHeading=).

**** TODO [50%] Implement Comments
***** DONE Parse block comments :@vidbina:
:LOGBOOK:
- State "DONE"       from "TODO"       [2022-09-25 Sun 20:57] \\
  Block comments are already being rendered albeit not in an optimal presentation.
:END:

I know what this means but essentially I want to be able to parse comments that are formatted as follows:

#+begin_src org
,#+begin_comment
This is a comment
,#+end_comment
#+end_src

and appears as:

#+begin_comment
This is a comment
#+end_comment

***** DONE Parse inline comments :@vidbina:
:LOGBOOK:
- State "DONE"       from "TODO"       [2022-09-25 Sun 21:10] \\
  Just verified that this works!
:END:

Readers need to be able to read inline comments such as the comment below:

# This is an inline comment and should be visible on the page!

***** DONE Stub Comment component :@tijan:assutech:
:LOGBOOK:
- State "DONE"       from "IN_TEST"    [2022-10-15 Sat 21:48] \\
  Tested and integrated with a90309f4c014dfe6838838a844be1668249620db
:END:

A comment component should open up as a drawer. Recorded a [[https://youtu.be/IDI6MfBz6sA][video (on YouTube)]] to demonstrate the capability.

See Figma frames [[https://www.figma.com/file/DenroEWfValwUxKZJdtLW7/formation.tools-(Copy)?node-id=850%3A879][comment open]] and [[https://www.figma.com/file/DenroEWfValwUxKZJdtLW7/formation.tools-(Copy)?node-id=852%3A1145][comment closed]] for a design candidate from @siarhei (our designer).

My thinking is that a third pane (to the right), like an aside could function like a side-notes/aside/footnotes section where we can present the comments (however long they are). This would keep the flow of the main text clean. In this case, we would just show some line in the main Prose view to indicate that there is some content hidden away and then the user can click on some icon on that line (like the plus or expand icon) to open the full comment block in the third and right-most pane -- the aside.

***** IN_TEST Integrate Comment component :@vidbina:

Take the component that @tijan developed and wire it up to replace the FallbackBlocks where we need comments displayed.

***** TODO Design a mechanism to bulk multiple successive comments into a single block :@vidbina:

Currently all comments are rendered in individual blocks, but we really want multiple comments to be presented under a single disclosure that can render multiple comments when expanded.


***** TODO Trigger Disclosure toggle on title click :@tijan:

The left-most expand/collapse icon is rather tiny and annoying to hit when in a hurry. As a user, I want to be able to quickly expand/collapse a comment block by clicking on the title too.
**** DONE Implement Source Blocks :@vidbina:
:LOGBOOK:
- State "DONE"       from "TODO"       [2022-09-29 Thu 16:42] \\
  Implemented by rendering source in a fallback component since https://gitlab.com/formation.tools/eng/proto-01/-/merge_requests/96. Future work will be to render this in a slicker code component. Battle for another day tho.
:END:

As a reader, I want to see the contents of source blocks presented as code. We don't expect any highlighting or any nifty features but we simply want to be able to read the contents of the code blocks.

We should be able to read the source block in section [[*Parse block comments][Parse block comments]] which is currently hidden.

The following code block should be parsed and displayed correctly (open as plaintext just to see what is in the source block).

#+begin_src org
,#+begin_src txt
This is a code-block inside of a an Org source block
,#+end_src
#+end_src

#+begin_src typescript
describe('source block', () => {
  const dut = (x) => parse(x).content[0]

  it('parses', () => {
    const raw = `
,#+begin_src txt
.......
. .   .
.......
,#+end_src
`
    expect(dut(raw)).toMatchInlineSnapshot(`
        {
          "content": ".......
        . .   .
        .......
        ",
          "type": "{",
        }
      `)
  })
})
#+end_src

**** TODO [50%] Implement Org tables
***** DONE Stub table component :@tijan:
:LOGBOOK:
- State "DONE"       from "TODO"       [2022-09-15 Thu 12:53] \\
  Looking good and merged into hack [2022-09-15 Thu 12:53].
:END:

***** DONE Render table in fallback while we await a proper implementation :@vidbina:
:LOGBOOK:
- State "DONE"       from "TODO"       [2022-09-29 Thu 16:53] \\
  Wrote this down and realized the table renders in a fallback-like style. Good enough for now.
:END:

We can't wait forever on this one, so meanwhile we need a way to render the following table in a fallback component and then touch it up into a slicker representation at a later point:

| key           | value                                                                                |
|---------------+--------------------------------------------------------------------------------------|
| name          | formation.tools                                                                      |
| type          | devtool                                                                              |
| stage         | prototype                                                                            |
| current niche | that Emacs crowd                                                                     |
| eventual goal | |

***** TODO Parse tables :@vidbina:

In order to display tables, we will need to parse them first. 😅 Right now the underlying datastructure is completely unclear (although I do have some ideas). Implementing the parsing of tables will inform which attributes and properties we need to keep in consideration.

Refer to [[*Render table in fallback while we await a proper implementation][previous task with example table]] for some example data to work with.

***** TODO Integrate table component :@vidbina:
**** DONE Introduce some padding in the ToC (left and right) to render it less crowded :@tijan:
:LOGBOOK:
- State "DONE"       from "TODO"       [2022-09-14 Wed 11:15] \\
  Already implemented and live.
:END:

The current ToC is looking very cluttered. Let's show the TODO tag, the headline text (for majority of the width of the ToC pane) and then the tags. I'm also open to dropping the tags from the TOC just to keep things cleaner because I believe that this is very likely just too much information.

**** TODO Implement general wrapper for inline components :@tijan:debt:

Grep codebase for =@tijan= and you'll find some notes on our Tailwind usage and DRY-ness (DRY as in "don't repeat yourself"). Let's stub an InlineContainer and a BlockContainer which we can reuse without having to redefine borders, shadows, background colors and basic typography.

Spoke with @tijan about this and we can look at extracting classes the Tailwind way https://tailwindcss.com/docs/reusing-styles#extracting-classes-with-apply to minimize duplication.

For now we have a =Block= element that also exposes =blockClasses= in case we need block-like styling anywhere but this point is still outstanding for refactoring.

**** WIP Implement comment component :@tijan:
*** DONE [100%] Create tab button group to switch modes :@vidbina:
:LOGBOOK:
- State "DONE"       from "TODO"       [2022-10-15 Sat 15:37] \\
  This has been solved with a mode selection component, named ModeSwitch
:END:

For user to switch between the different modes/perspectives/views, let's just call it *perspective*, of a document we need something better than the toggle so let's define a button group that looks a bit like the Preview/Code tablist on pages such like https://tailwindui.com/components/application-ui/navigation/tabs to make it much clearer which view is currently active.

#+begin_comment
I guess perspective is clear enough as it provides a perspective on a document. /Modes/ may introduce confusion if we were to support vim-style modal navigating/editing at some point and /views/ already has a meaning with regards to interface development that could confuse us, as a team, or readers. /Perspective/ seems like a word that isn't used too often within the realm of text-editing and interface development to allow for easy misunderstanding -- I hope 😅.
#+end_comment

**** DONE Spar with design-team on placement of such a control
:LOGBOOK:
- State "DONE"       from "TODO"       [2022-09-25 Sun 22:12] \\
  Top bar is the place for now, but we will revisit this at a later point to localize the perspective-switch in the perspective view itself.
:END:

Reach out to @siarhei and team to figure out where to best place the perspective control.

**** DONE Update toggle-references in zero section
:LOGBOOK:
- State "DONE"       from "TODO"       [2022-09-25 Sun 22:13] \\
  Not very clear. We need to implement images to clarify this even more.
:END:

The opening section of this document points people towards the Toggle to switch views. Once's we've been able to rip that out, we can update the text to point viewers towards the new controls.

*** TODO Fix =undefined= classes :@vidbina:debt:

I did something stupid in the rush of dropping the build. When you study the classes you'll find a few classes named =undefined= littering the codebase. 💩 Clean this up!

*** WIP [%] Kanban Perspective
**** TODO Make Kanban columns scrollable :@purcy:

Currently the entire Kanban view is y-scrolled as a whole but we want end-user to scroll individual columns for better control. Especially alter when we will want to facilitate DnD.

**** DONE Clean up Kanban cards component :@vidbina:
:LOGBOOK:
- State "DONE"       from "TODO"       [2022-09-07 Wed 21:53] \\
  More or less done, albeit scrappy 😅
:END:

1. The Kanban cards currently display an edit button and a deadline component. We want to hide the edit button and the deadline tag-like component and instead display the headline tags.

2. Kanban cards may need to provide some context by indicating which heading they belong to.

*** TODO Collect all tags for a document and color-code them :@vidbina:

For readability's sake, we want to color code all the tags such that the same value tags always appear in the same color. This should allow readers to visually associate related items provided that the readers/observers are capable of discerning the colors.

As a follow-up point, we should define a task to break inventorize which colors are fair to use from an a11y perspective in order to maximize the /serviced audience/ by this feature.

*** DONE Fix ToC Disclosure animation :@tijan:
:LOGBOOK:
- State "DONE"       from "TODO"       [2022-09-07 Wed 22:09] \\
  All handled by @tijan 🏆🥳
:END:

When expanding/collapsing the ToC sections, the disclosures are not smoothly animated. The setup seems to be unaware of the changing height of the children and only effects a height-related change when the child elements are removed altogether which creates a bit of a visual shock as the space for the children instantly disappears from one moment to another.

I very likely lack the lingual skills to explains this very clearly, so just have a look in the storybook and then hop into my Google Meet room for us to talk it through for clarification.

#+begin_comment
💡 I'm an idiot! Whatever animation I currently implemented there is horrible. Especially on the longer list displayed in the index, the ugliness is very pronounced. It all looked decent in the shorter lists in Storybook but now it's clear that we can remove whatever I did there.

It's so ugly it's technically criminal! My "engineering" license should be revoked for this one. 😅 Good thing I don't do this for a living.
#+end_comment

*** WIP [40%] Lists
**** DONE Implement list parsing :@vidbina:
:LOGBOOK:
- State "DONE"       from "TODO"       [2022-09-05 Mon 22:33] \\
  Implemented with vidbina/parse-lists, ready for @tijan to work on the component.
:END:

List can be parsed as follows:

#+begin_src typescript
import parse from core/parser'

parse(rawText).content[0]
#+end_src

where you can use the following raw text samples:

- unordered list

  #+begin_src org
- first item in *unordered list*
- this is another point
  - this is a subpoint
  #+end_src

- ordered list

  #+begin_src org
1. first item in *ordered list*
2. 2nd item
  #+end_src

- description list

  #+begin_src org
- one :: first number
- two :: 2nd number
  #+end_src

- mixed list

  #+begin_src org
- fruits

  1. apples

    - Apple Computer :: a computer company

    - Apple Records :: record label

    - Grannie Smith :: green apple

  - bananas

    Bananas are a good source of electrolyte and potassium

  - pears

  - tomatoes

- [-] vegetables
  - [X] spinach
  - [ ] broccoli
  - [ ] cauliflower
  - [X] cabbage
  - [~] salat
  #+end_src

#+begin_center
💡 All of the previously listed samples are verified to parse correctly in the parser spec (core/parser.test.ts).
#+end_center

**** DONE Implement list component :@tijan:
:LOGBOOK:
- State "DONE"       from "TODO"       [2022-09-14 Wed 11:42] \\
  Merged into mainline but the question of folding/unfolding lists is yet to be solved.
:END:

In order to render lists correctly, we need to stub out a List component that can handle the inputs demonstated in [[*Implement list parsing][Implement list parsing]].

**** TODO Display checkboxes in lists
**** TODO Implement list folding
*** IN_DEV Stub NarrowSidebar layout for reader view :@vidbina:
:LOGBOOK:
- Note taken on [2022-09-05 Mon 22:30] \\
  Just wired up the home page to display the Engineering doc with branch vidbina/wire-up-layouts. Consider this a babystep to the end-goal.
:END:

Page /reader/[url] will be using the NarrowSidebar which is already demonstrated in a story for reference's sake. The following inputs are needed for the new layout:

- viewControl :: a ReactNode that is wired up to handle typography and dark mode state
- sessionOptions :: empty list for starters
- navigationOptions :: empty list for starters
- menuOptions :: empty list for starters
- session props :: static, hard-coded vals for starters

*** WIP [0%] Restyle reader entrypoint :@vidbina:
:LOGBOOK:
- Note taken on [2022-09-05 Mon 22:32] \\
  Instead of creating a UI flow, we are improving and simply rendering the Engineering document at index. This is a quick-fix to buy us some time. 😅
:END:

Page /reader/index needs to be restyled to align stylistically with the main reader, otherwise users may be confused into thinking that these are different apps.

What basically has to happen:
- [ ] browse from the Tailwind catalog which UI layouts are best suited for this view
- [ ] copy Tailwind templates over into the codebase
- [ ] delegate follow-up implementation

*** TODO [33%] Dev Tooling :devtools:
**** TODO Setup Storybook to be Next Router aware :devtools:

See https://storybook.js.org/addons/storybook-addon-next-router

**** TODO Upgrade Storybook [2022-09-29 Thu] :devtools:debt:

See the following snippet:

#+begin_src txt
╭──────────────────────────────────────────────────────────────────────────────────────────╮
│                                                                                          │
│   Storybook 6.5.10 for React started                                                     │
│   19 s for manager and 21 s for preview                                                  │
│                                                                                          │
│    Local:            http://localhost:6006/                                              │
│    On your network:  http://192.168.228.210:6006/                                        │
│                                                                                          │
│   A new version (6.5.12) is available!                                                   │
│                                                                                          │
│   Upgrade now: npx storybook@latest upgrade                                              │
│                                                                                          │
│   Read full changelog: https://github.com/storybookjs/storybook/blob/next/CHANGELOG.md   │
│                                                                                          │
╰──────────────────────────────────────────────────────────────────────────────────────────╯
#+end_src

**** DONE Remove base64encode from codebase or mock :fix:devtools:
:LOGBOOK:
- State "DONE"       from "TODO"       [2022-09-29 Thu 16:40] \\
  Just merged into Hack as part of wrapping up https://staging.formation.tools/#implement-source-blocks (https://gitlab.com/formation.tools/eng/proto-01/-/merge_requests/96)
:END:

The use of =base64encode= Causes =Buffer=-related errors within storybooks and other more limited environments (iirc unit tests may be struggling with this as well but I could be wrong here) than the browser or Node.js:

#+begin_src text
index.js:56 Unexpected error while loading ./app/LayoutNarrowSidebar.stories.tsx: Buffer is not defined
 ReferenceError: Buffer is not defined
    at Function.encode (http://localhost:6006/vendors-node_modules_storybook_addon-actions_preview_js-generated-config-entry_js-node_module-9a87b3.iframe.bundle.js:31241:5)
    at encodeTarget (http://localhost:6006/main.iframe.bundle.js:4472:59)
    at Module../core/helpers.tsx (http://localhost:6006/main.iframe.bundle.js:4470:21)
    at __webpack_require__ (http://localhost:6006/runtime~main.iframe.bundle.js:28:33)
    at fn (http://localhost:6006/runtime~main.iframe.bundle.js:339:21)
    at Module../components/app/LayoutNarrowSidebar.tsx (http://localhost:6006/main.iframe.bundle.js:2227:71)
    at __webpack_require__ (http://localhost:6006/runtime~main.iframe.bundle.js:28:33)
    at fn (http://localhost:6006/runtime~main.iframe.bundle.js:339:21)
    at Module../components/app/LayoutNarrowSidebar.stories.tsx (http://localhost:6006/main.iframe.bundle.js:5623:79)
    at __webpack_require__ (http://localhost:6006/runtime~main.iframe.bundle.js:28:33)
error @ index.js:56
(anonymous) @ executeLoadable.js:58
(anonymous) @ executeLoadable.js:52
executeLoadable @ executeLoadable.js:51
executeLoadableForChanges @ executeLoadable.js:100
getProjectAnnotations @ start.js:129
configure @ start.js:165
configure @ index.js:21
./generated-stories-entry.cjs @ generated-stories-entry.cjs:6
__webpack_require__ @ bootstrap:24
_requireSelf @ hot module replacement:102
apply @ jsonp chunk loading:444
(anonymous) @ hot module replacement:344
internalApply @ hot module replacement:342
hotApply @ hot module replacement:301
cb @ process-update.js:76
(anonymous) @ process-update.js:91
Promise.then (async)
check @ process-update.js:90
module.exports @ process-update.js:52
processMessage @ client.js:279
handleMessage @ client.js:139
handleMessage @ client.js:102
react-dom.development.js:86 Warning: ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot
#+end_src

We can either
1. refactor code to rip out the =Buffer=-depending logic from the views or
2. mock the =base64encode= calls to provide some behavior that Storybook can work with

*** TODO Rename =FObjectType= to =FObject= :debt:

For naming consistency, we should drop the =Type= prefix. I borrowed this from the reference implementation in uniorg but it is a bit more verbose than needed and actually confusing since I don't follow the pattern for ElementType in a consistent manner.

*** TODO Fix =unpackElementType= to return correct fallbacks :debt:

The function =unpackElementType= returns an incorrect fallback. It returns a =e=-typed fallback, which is reserved for Element types, for a GreaterElement element which should actually unpack into an =E=-typed fallback.

Furthermore, there are a bunch of elements for which this function just returns nothing (denoted by the empty list) instead of a fallback entry so a bunch of information goes missing.

*** TODO Design =DocumentPart=

Note that every section can contain its own definition of title

*** TODO Merge =unpackElementType= and =convert= into single function :arch:debt:

Perhaps we even remove =unpackElementType= in order to fully rely on =convert= which we may rename to =unpack= in its new role.

The reasons being:
1. there is quite of repetition between the two functions
2. =convert= effectively calls =unpackElementType= and this logic could sensibly be considered part of the same concern
3. converting into a Element alone may not be sufficient as elements tend to exist in the context of a document so we may have to convert an Element into a DocumentPart instead which can be a richer container for some helpful additional context for an Element to be understood correctly
   - a heading with a particular TODO state exists in the context of a section which outlines what that state /means/ in the context of that section (the section may define the workflow)
   - footnote references don't exist without

**** Background

From https://orgmode.org/worg/dev/org-syntax.html#orge56d8c5:

#+begin_quote
The components of this syntax can be divided into two classes: “objects” and “elements”. To better understand these classes, consider the paragraph as a unit of measurement. Elements are syntactic components that exist at the same or greater scope than a paragraph, i.e. which could not be contained by a paragraph. Conversely, objects are syntactic components that exist with a smaller scope than a paragraph, and so can be contained within a paragraph.

Elements can be stratified into “headings”, “sections”, “greater elements”, and “lesser elements”, from broadest scope to narrowest. Along with objects, these sub-classes define categories of syntactic environments. Only headings, sections, property drawers, and planning lines are context-free1, 2, every other syntactic component only exists within specific environments. This is a core concept of the syntax.

Expanding on the stratification of elements, lesser elements are elements that cannot contain any other elements. As such, a paragraph is considered a lesser element. Greater elements can themselves contain greater elements or lesser elements. Sections contain both greater and lesser elements, and headings can contain a section and other headings.
#+end_quote

- context free

  Read https://en.wikipedia.org/wiki/Context-free_language as I will not pretend to understand this but the following elements should be parseable context-free and all other elements exist within the context of either of the following:

  - planning elements

    see https://orgmode.org/worg/dev/org-syntax.html#Planning

    #+begin_src org
,*** TODO watch "The Matrix"
    SCHEDULED: <1999-03-31 Wed>
    #+end_src

  - property drawers

    see https://orgmode.org/worg/dev/org-syntax.html#Property_Drawers

    #+begin_src org
:PROPERTIES:
:CUSTOM_ID: someid
:END:
    #+end_src

  - sections

    see https://orgmode.org/worg/dev/org-syntax.html#Sections

    #+begin_src org
An introduction.
,* A Heading
Some text.
,** Sub-Topic 1
,** Sub-Topic 2
,*** Additional entry
    #+end_src

    which is parsed into the following rough structure (in pseudocode)

    #+begin_src text
(document
 (section)
 (heading
  (section)
  (heading)
  (heading
   (heading))))
    #+end_src

  - headings

    see https://orgmode.org/worg/dev/org-syntax.html#Headings

    #+begin_src org
,* 
,** DONE
,*** Some e-mail
,**** TODO [#A] COMMENT Title :tag:a2%:
    #+end_src

    Note that the first heading is space terminated otherwise, Emacs doesn't seem to recognize it as a heading. The example snippet copied from the referenced link on [2022-08-20 Sat 19:09] does not contain a whitespace so the copied content was not recognized as the author intended.

*** DONE Resolve GPL licensing issue
:LOGBOOK:
- State "DONE"       from "TODO"       [2022-09-07 Wed 21:53] \\
  It's GPL3 now. It's a prototype build so we'll have to get over it. The idea of keeping this GPL3 is a fun challenge as well.
:END:

At the moment, the front-end will have to be released under GPL3 as far as we understand. This represents a risk for the commercial interests of the project and thus it is important to consider how we design the system going forward. Some approaches would be to:

1. eliminate all GPL3 code and opt for more permisssive parsers if we can find any or write one ourselves
2. design the architecture of the overal system such that we have a clear strategy about what is GPL3 and what we can continue to develop as IP

**** TODO Look into non-GPL3 parser availability

The uniorg is licensed under GPL3 and possible must be because it represents a /translation/ (see GPL3 text for the definition of a translated program) of the org-element.el implementation in Emacs also under a GPL license. The alternative org-parser is also licensed as GPL3 so, apart from the effort to integrate, this would not be a valid option either.

**** TODO License front-end under GPL3

If we cannot find a permissive parser, we will have to license the front-end project under GPL3.

**** TODO Research how to deliver back-end logic as separate modules/services in Vercel

In order to avoid having to bundle everything into a GPL3 app, we can provide all base front-end logic in the app and then take the marketplace approach and offer integrations with forces, communication tools and other third-party services (or our own services) through server-side facilities.

*** TODO Replace uuidv4 with uuid

Use https://www.npmjs.com/package/uuid instead of https://www.npmjs.com/package/uuidv4 as per UUIDv4's notice https://github.com/thenativeweb/uuidv4#please-note.

*** WIP [14%] Replace Grommet for TailwindCSS :debt:

**** TODO Setup TailwindCSS

Switching from Grommet to Tailwind because:
1. the Grommet UI is a bit more playful than we need our app to look
2. we will be bringing in some dev help that is pretty fluent with Tailwind and we want to be efficient
3. TailwindUI provides paid component options that we can use to fast-track development of our UI

***** DONE Setup Tailwind for Storybook :@assutech:
:LOGBOOK:
- State "DONE"       from "TODO"       [2022-08-23 Tue 17:36] \\
  Sorted by @purcy on [2022-08-23 Tue] so we no longer have to worry about this. Future point would be to look into honoring Tailwind styles in the Storybook views as the current setup renders the components without any styling.
:END:

To simplify development of UI parts, we would like to be able to review components in Storybook. For this, we need to configure the project in order for =npm run storybook=.

Fix the configuration and provide links to the relevant documentation that explains the design choicese in that configuration.

****** Error

The following error is produced when running =npm run storybook=:

#+begin_src text
info @storybook/react v6.5.9
info 
info => Loading presets
info Addon-docs: using MDX1
info => Using PostCSS preset with postcss@7.0.39
info => Using default Webpack5 setup
<i> [webpack-dev-middleware] wait until bundle finished
9% setup compilation DocGenPluginnode:internal/modules/cjs/loader:959
  throw err;
  ^

Error: Cannot find module 'webpack/lib/util/makeSerializable.js'
Require stack:
- /home/vidbina/src/formation.tools/eng/proto-01/main/node_modules/@storybook/react-docgen-typescript-plugin/dist/dependency.js
- /home/vidbina/src/formation.tools/eng/proto-01/main/node_modules/@storybook/react-docgen-typescript-plugin/dist/plugin.js
- /home/vidbina/src/formation.tools/eng/proto-01/main/node_modules/@storybook/react-docgen-typescript-plugin/dist/index.js
- /home/vidbina/src/formation.tools/eng/proto-01/main/node_modules/@storybook/react/dist/cjs/server/framework-preset-react-docs.js
- /home/vidbina/src/formation.tools/eng/proto-01/main/node_modules/@storybook/core-common/dist/cjs/presets.js
- /home/vidbina/src/formation.tools/eng/proto-01/main/node_modules/@storybook/core-common/dist/cjs/index.js
- /home/vidbina/src/formation.tools/eng/proto-01/main/node_modules/@storybook/core-server/dist/cjs/index.js
- /home/vidbina/src/formation.tools/eng/proto-01/main/node_modules/@storybook/core/dist/cjs/server.js
- /home/vidbina/src/formation.tools/eng/proto-01/main/node_modules/@storybook/core/server.js
- /home/vidbina/src/formation.tools/eng/proto-01/main/node_modules/@storybook/react/dist/cjs/server/index.js
- /home/vidbina/src/formation.tools/eng/proto-01/main/node_modules/@storybook/react/bin/index.js
    at Function.Module._resolveFilename (node:internal/modules/cjs/loader:956:15)
    at Function.Module._load (node:internal/modules/cjs/loader:804:27)
    at Module.require (node:internal/modules/cjs/loader:1028:19)
    at require (node:internal/modules/cjs/helpers:102:18)
    at Object.<anonymous> (/home/vidbina/src/formation.tools/eng/proto-01/main/node_modules/@storybook/react-docgen-typescript-plugin/dist/dependency.js:6:55)
    at Module._compile (node:internal/modules/cjs/loader:1126:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1180:10)
    at Module.load (node:internal/modules/cjs/loader:1004:32)
    at Function.Module._load (node:internal/modules/cjs/loader:839:12)
    at Module.require (node:internal/modules/cjs/loader:1028:19) {
  code: 'MODULE_NOT_FOUND',
  requireStack: [
    '/home/vidbina/src/formation.tools/eng/proto-01/main/node_modules/@storybook/react-docgen-typescript-plugin/dist/dependency.js',
    '/home/vidbina/src/formation.tools/eng/proto-01/main/node_modules/@storybook/react-docgen-typescript-plugin/dist/plugin.js',
    '/home/vidbina/src/formation.tools/eng/proto-01/main/node_modules/@storybook/react-docgen-typescript-plugin/dist/index.js',
    '/home/vidbina/src/formation.tools/eng/proto-01/main/node_modules/@storybook/react/dist/cjs/server/framework-preset-react-docs.js',
    '/home/vidbina/src/formation.tools/eng/proto-01/main/node_modules/@storybook/core-common/dist/cjs/presets.js',    '/home/vidbina/src/formation.tools/eng/proto-01/main/node_modules/@storybook/core-common/dist/cjs/index.js',
    '/home/vidbina/src/formation.tools/eng/proto-01/main/node_modules/@storybook/core-server/dist/cjs/index.js',
    '/home/vidbina/src/formation.tools/eng/proto-01/main/node_modules/@storybook/core/dist/cjs/server.js',
    '/home/vidbina/src/formation.tools/eng/proto-01/main/node_modules/@storybook/core/server.js',
    '/home/vidbina/src/formation.tools/eng/proto-01/main/node_modules/@storybook/react/dist/cjs/server/index.js',
    '/home/vidbina/src/formation.tools/eng/proto-01/main/node_modules/@storybook/react/bin/index.js'
  ]
}
#+end_src

****** Relevant Links

https://storybook.js.org/addons/@storybook/addon-postcss

https://dev.to/lico/storybook-webpack-5-error-cannot-find-module-webpacklibutilmakeserializablejs-109m

***** DONE Explore if we need HeadlessUI :@vidbina:
:LOGBOOK:
- State "DONE"       from "WIP"        [2022-08-23 Tue 17:37] \\
  We need HeadlessUI for the React components and some of the dynamic behavior associated with them (think Dialogs for Modals, Disclosures for accordion-like components, etc.). Some of the TailwindUI components seem to depend on this library and other third-party component libraries such as Flowbite 😠 (yeah, I'm not amused about this product ATM) seem to do the same.
:END:

In branch vidbina/setup-tailwind-headlessui, we are trying out incorporating HeadlessUI components in our setup. If this works, it may simplify building components in React that are based on top of TailwindCSS.

The HeadlessUI repository is pretty small, as in, only few components.

**** TODO Explore what we need from Flowbite :@purcymarte:

Flowbite has a UI blocks (based on TailwindCSS) that we can build on such as:
- https://flowbite.com/application-ui/demo/kanban/
- https://flowbite.com/blocks/

We have to explore to which extend we need this and can bring this in.

If we start a branch e.g.: setup-tailwind-flowbite, start it from vidbina/setup-tailwind.

**** TODO Investigate how to set html/body-level classes at run-time

The Next.js docs outline in https://nextjs.org/docs/advanced-features/custom-document how we can set =html= and =body= level classes from within the =pages/_document.tsx= file with the caveat that these are server-side rendered and therefore cannot support dynamic behavior (for example the use of event handlers such as =onClick=).

The blog post https://smnh.me/add-class-to-body-tag-in-nextjs outlines some ways to deal with html/body-level dark-mode settings which are /dynamic/ in the sense that they are change during run-time and will need to be updated. It isn't quite clear if the instructions here are relevant at this moment [2022-08-21 Sun 18:01] so we will need to investigate what the issue here is.

The reason why this information is relevant is because some of the TailwindUI components such as https://tailwindui.com/components/application-ui/application-shells/multi-column will require the following updates to our template:

#+begin_src html
<html class="h-full bg-white">
<body class="h-full overflow-hidden">
#+end_src

The use of class =bg-white= is for non-dark-mode templates. Toggling dark mode will therefore require changes to the =html= and =body= classList at runtime in order to work adequately.

**** TODO Decompose selected layout from components/Layout into its constituent parts

@vidbina has copied over a few Application UI/Application Shells from TailwindUI and has made the necessary translations from HTML to JSX just to have something that looks okay-ish as a starting point.

We now have to take these compositions, basically UI dumps, and then decompose them into the larger subparts such as (following are just an example):
- SideBar which may contain
  - Menu which contains
    - MenuItem
  - UserProfileWidget
- ContentPane
- NavigationBar
  - Searchbar
  - Menu
  - UserProfileAvatar

Note that the example in components/Layout.tsx is not complete in that some of the animations are broken and state is lacking which is why menus or other state-dependent elements will not behave correctly. All of these capabilities will need to be implemented.

#+begin_center
💡 As a reference, look at component ToggleDarkMode which represents a basic TailwindCSS component which was translated from the TailwindUI code listing and then retrofitted to contain the correct images and to behave as expected by implementing event handling and by binding state into the component.
#+end_center

**** DONE Implement ToC
:LOGBOOK:
- State "DONE"       from "TODO"       [2022-09-25 Sun 14:37] \\
  Basic TOC is implemented. Some improvements like linking are still pending but that is to be considered future work.
:END:
***** DONE Stub ToC :@purcy:
:LOGBOOK:
- State "DONE"       from "TODO"       [2022-08-23 Tue 17:39] \\
  @purcy stubbed this component today [2022-08-23 Tue] and I just integrated it so we should be good to go. We still want to incorporate HeadlessUI's Disclosure components in order to facilitate folding but this is a nice-to-have that we can address later. First we have to address some higher-level layouting concerns because I just plopped the ToC on a page without much though or any grace. 😅
:END:

***** DONE Make ToC dark-mode aware :@purcy:
:LOGBOOK:
- State "DONE"       from "TODO"       [2022-09-25 Sun 14:36] \\
  This issue is actually unresolved pending because we've refactored the TOC to show in dark-mode for better contrast during the light-mode. In the current form, we are not exposing the dark-mode functionality to end-users and will be recommending the use of a plugin like DarkReader to have a computed browser-wide dark-mode instead of one explicitly designed by us.
:END:

Switching between light and dark mode with the ToC rendered doesn't really change the text color. The ToC text should follow the classes for the main text which is altered during light/dark mode transitions. Not sure which TailwindCSS classes need to be set.

***** DONE Incorporate Disclosure components to enable folding of levels
:LOGBOOK:
- State "DONE"       from              [2022-09-25 Sun 14:34] \\
  Already merged into mainline (work done by @tijan)
:END:
***** DONE Implement links in ToC
:LOGBOOK:
- State "DONE"       from              [2022-09-25 Sun 14:34] \\
  Implemented a naive approach (unique link ids per session)
:END:

See [[*Design headline linking strategy][Design headline linking strategy]] for a characterization of the headline labelling problem. Once we've resolved this, we should roll an implementation for the ToC (and also the Prose but that is another concern).

**** TODO Build Tailwind components for doc

- components
  - app, for app ui
    - layout
      - TwoPaneLayout
    - DarkModeToggle
  - doc, for document ui
    - Datetime
    - Link
    - List

**** TODO Remove Grommet-specific containers

We still use Col, Row, Main, MainContent and AppContainer from components/View.tsx

#+begin_quote
I'm upgraded this task (instead of a child of the [[*Setup TailwindCSS][Setup TailwindCSS]] task it is now a sibling thereof) since it doesn't block any of the other tasks. We can therefore move along on the Storybook or TailwindCSS concerns without this affecting us at all. Having it here may allow @purcy to prototype things quickly and then we do the translation afterwards so I'm deprioritizing this as well by moving it to the bottom of the task list.
#+end_quote

***** TODO Remove all Grommet artifacts

With Tailwind coming in, we should remove gradually remove Grommet. It isn't clear where all Grommet dependencies are, in terms of files that are Grommet-related, but we would need to identify them and then rid them from the dependency (remove Grommet dependency from core components) and also clean up the dependency manifest (packages.json).

****** TODO Remove Grommet-related styling

Note that _app.tsx imported =GlobalStyle= from styles/global.js. We have already removed the import but the styles/global.js file is still in place and will need to be removed.

*** Research
**** TODO [%] Study task dependencies

***** TODO Read /UOMF: Advanced Usage of Dependencies Between Tasks Using Org Mode/ by Karl Voit

https://karl-voit.at/2016/12/18/org-depend/
** API v1

**** TODO Define inbox endpoint

** [%] Browser Extension

- store selection to inbox
- view inbox in overlay/modal

*** TODO Explore how to solve SSO for an extension

Can we allow a user to SSO-login through a regular tab and then use that session data for the extension? AFAIK there is some scoping between tabs and extension and we don't want to complicate the sign-in experience in the extension.

Ideally, we can facilitate SSO from a (Google, GitHub) session that is already live within the browser.

*** TODO Stub extension UI
* Background

👋🏿 This is an Org file, that markup format associated to /Org-mode/ the so-called killer feature of Emacs 🐃🙊 but that's not the point. I've *hated Confluence, Notion and consorts 😠 with a passion* for a while and was keen to have a way to collaborate through plaintext with folks. It's obviously unfair to ask folks to learn Emacs, so I figured building a tool that allows folks to read Org files is at least something I can do to stop my whining about Confluence, Notion, et. al in the "shut up, fix it" spirit. This is the scrappiest prototype that I could whip up to start flirting with the idea. 🌱

The cool thing is that such Org files can be presented differently to provide a better overview to you, the reader. We can look at them as *prose*, as a *kanban board* (which displays the entries in this document that are tasks), as an *calendar* (for a view of everything that has dates/times associated to them) and more.

The toggle top-right can be flipped to switch between prose and Kanban view on this doc. Yeah, it's a horrible UX but it was the quick-and-dirty thing that we could built in there. 🙈

** 🥱 TL;DR

The "big idea" 💡 here is that most of this is kept as plaintext and that a git repo is the conduit to keep track of your content and changes. For most users, this is not interesting so we can provide them a web tool that abstrats all this git and Org stuff away from them but will allow the other weirdo hackers like myself to just live in their editor of choice and not worry about context-switching between their editor and slow web-tools.

Many of us probably agree that git is a great way to collaborate and track versions of ever-changing text. We don't need our data stored somewhere in someone else's database and request permissions through clunky APIs to access it when you can just have it on a repo on your machine. We want to offer a an easy API and good utils to just do whetever the heck you want with the files on your box. Honestly, with the development in tooling recently, decent search or other capabilities should be easily serviceable by your own machine through different utils (some perhaps built in Rust). Our computers are definitely packing enough heat to handle all the compute needed to for a local knowledge base.

Depending on how poorly (or warmly) this is received, I will decide how to move forward, so that feedback is needed for me to know if this is a moderately sensible idea or totally ludicrous. 😅 We're thinking about supporting collaborative editing in the future. I'm already setting up a coffee meet with the author of [[https://github.com/rasendubi/uniorg][ProseMirror]] to explore this. Imagine being able to look at a prose, kanban or calendar diffs on the state of an Org-file when you come back from vacay 🏖️ to get a quick sense of all the things that have changed. This is also on the wishlist.

So in the spirit of *scrappy prototypes*, the [[https://gitlab.com/formation.tools/eng/proto-01][repo]] is online and *GPL3* (because I'm using [[https://github.com/rasendubi/uniorg][@rasendubi's uniorg]])... Roast away! 🔥

* WIP Stack

- *TypeScript* over JavaScript
- *React* because of large eco-system (think: *Storybook, Next.JS*, etc.)
  - good xs to docs and examples
  - ability to deploy easily to *Vercel*

** Infrastructure

#+begin_src dot :noweb yes :file gen/infra.overview.png
digraph G {
  compound=true;
  //bgcolor="transparent"

  <<infra-domains>>

  <<infra-vercel>>

  <<infra-plausible>>

  <<infra-associations>>
}
#+end_src

#+RESULTS:
[[file:gen/infra.overview.png]]

#+begin_comment
🧭️ Everything that is dotted and in red is on the way out! Things that are gray and dashed are ideas to likely be introduced Everything green and filled is live at the moment and everything else is just there but not highlighed to keep the diagram from being too cluttered.
- red and dotted :: deprecating
- green and filled :: live
- gray and dashed :: idea
#+end_comment

#+RESULTS:
[[file:gen/infra.overview.png]]

*** Vercel

We use Vercel as our compute provider because it is easy.

#+begin_src dot :noweb yes :noweb-ref infra-vercel
subgraph cluster_scope_vercel {
  label = "Vercel scope"

  <<infra-vercel-apps>>
}
#+end_src

**** Prototype Application

The prototype app is our current drop-in point -- the one place where you end up for everything. Since we're in an early testing/validation stage, we are *keeping this scrappy for now until we know what to really build*.

#+begin_src dot :noweb-ref infra-vercel-apps
node_vercel_proto [shape=box,label="proto-01",style=filled,color=lightgreen];
#+end_src

**** APIs

We anticipate needing different APIs at a later stage for different functionality, e.g.:
- integrations with forges data hosting platforms (like GitLab or GitHub)
- integrations with auth services
- integrations with NLP-services to solve QA tasks or offer /text paragraphing/ features (like an automated variant of Reddit's ELI5)
- integrations with chat platforms (like Slack), could be mounted under =/api/v1/communications/*=

All these APIs and integrations can be separate Vercel apps just to keep things more cleanly isolated. That way we can decouple deployments of our different services.

***** Concepts

#+begin_quote
💡 This is just a concept section of APIs that we can implement at some point. As this section is commented, the dot diagram code below is not rendered into the infra overview at the top of this section.
#+end_quote

#+begin_src dot :noweb-ref infra-vercel-apps
node_api_v1 [shape=box,style=dashed,color=lightgrey,label="API v1"];
node_api_v1_data_git [shape=box,style=dashed,color=lightgrey,label="API v1 git data svc"];
node_api_v2 [shape=box,style=dashed,color=lightgrey,label="API v2"];
#+end_src

**** Proxy/Rewrite

We started off by directing all of our domains to a rewrite/proxy service where we resolved paths. This allowed us to gradually build out our stack with different services that we can mount under arbitrary paths on our target domains but was challenging to develop with. On [2022-09-15 Thu 12:08], I had a call with Hassan about DX and we decided to move all rewrites to the prototype project directly.

By using the [[https://nextjs.org/docs/api-reference/next.config.js/rewrites][rewrites]] facility in [[https://nextjs.org/docs/api-reference/next.config.js/introduction][next.config.js]], we should be able to reference [[https://nextjs.org/docs/basic-features/environment-variables][environment variables]] which can be defined *using .env.local files during development* (and pointed towards any arbitrary destination) and through the *Environment Variables platform facility on a per-branch level* in the Vercel platform. This should provide us the needed control and a tenable DX.

#+begin_src dot :noweb-ref infra-vercel-apps
subgraph cluster_vercel_conf {
  style=dotted;
  color=red;
  label = "vercel-config";
  node_vercel_conf [shape=box,label="vercel.json"];
}
#+end_src

Some of the rewrites that we conduct are rewrites to external services. The last defined rewrite and therefore *our fallback path is the prototype app* for now.

#+begin_src dot :noweb-ref infra-associations
node_vercel_conf -> node_api_v1_data_git  [label="/api/v1/data/git",style=dashed,color=lightgrey,ltail=cluster_vercel_conf];
node_vercel_conf -> node_api_v1  [label="/api/v1/*",style=dashed,color=lightgrey,ltail=cluster_vercel_conf];
node_vercel_conf -> node_api_v2  [label="/api/v2/*",style=dashed,color=lightgrey,ltail=cluster_vercel_conf];
node_vercel_conf -> node_vercel_proto  [label="/*",ltail=cluster_vercel_conf];
#+end_src

Eventually, we can use the rewrites/proxy mechanism to mount all of our own services and 3rd-party services under friendlier paths, for example (and bear with me, this is just me musing):
- =/api/v1/auth/*= for auth services
- =/api/v1/data/*= to for data services,
  - =/api/v1/data/forge/= for forge integrations (to GitHub, GitLab, Gitea, etc.)
- =/api/v1/nlp/*= for NLP services
- =/api/market= for 3rd-party marketplace services

*** DNS

We have the following domain names:
- formation.tools
- forto.dev
- f7n.io

#+begin_src dot :noweb-ref infra-domains
subgraph cluster_domains {
  label = "Domains"

  node_subdomain_prod [shape=box,label="proto.formation.tools"];
  node_subdomain_hack [shape=box,style=dashed,color=lightgrey,label="hack.formation.tools"];
  node_subdomain_staging [shape=box,style=dotted,color=red,label="staging.formation.tools"];

  node_domain_a [shape=box,label="formation.tools"];
  node_domain_b [shape=box,label="forto.dev"];
  node_domain_c [shape=box,label="f7n.io"];
}
#+end_src

We use the Rewrite (Proxy) facility from Vercel to manage these domains through a single Vercel project -- a convenient drop-in point to serve as our nice traffic-direction point.

#+begin_src dot :noweb-ref infra-associations
node_subdomain_prod -> node_vercel_proto [label="Production"];
node_subdomain_hack -> node_vercel_proto [style=dashed,color=lightgrey,label="branch: hack",label="branch: hack"];

node_subdomain_staging -> node_vercel_conf [lhead=cluster_vercel_conf,style=dotted,color=red,label="branch: staging"];
node_domain_a -> node_vercel_conf [lhead=cluster_vercel_conf,style=dotted,color=red,];
node_domain_b -> node_vercel_conf [lhead=cluster_vercel_conf,style=dotted,color=red,];
node_domain_c -> node_vercel_conf [lhead=cluster_vercel_conf,style=dotted,color=red,];
#+end_src

*** Plausible

We use [[https://plausible.io/proto.formation.tools?period=realtime][Plausible]] for analytics. On the Plausible end, only two artifacts are relevant:
1. the event API and
2. the Plausible client script

#+begin_src dot :noweb-ref infra-plausible
subgraph cluster_scope_plausible {
  label = "Plausible"
  node_plausible_v1_api_event [style=dashed,color=lightgrey,shape=box,label="/api/event"];
  node_plausible_v1_script [style=dashed,color=lightgrey,shape=box,label="/js/script.js"];
}
#+end_src

In order to minimize the potential for loosing data due to ad-blockers, we *proxy* our own paths onwards to Plausible as suggested in the Plausible documentation on [[https://plausible.io/docs/proxy/introduction#options-for-dealing-with-missing-data-as-a-site-owner][dealing with missing data]] (link captured on [2022-09-14 Wed 14:38]).

#+begin_src dot :noweb-ref infra-associations
node_vercel_proto -> node_plausible_v1_script  [style=dashed,color=lightgrey,label="/js/script.js",ltail=cluster_vercel_conf];
node_vercel_proto -> node_plausible_v1_api_event  [style=dashed,color=lightgrey,label="/api/v1/event",ltail=cluster_vercel_conf];
#+end_src

*** DONE Stub Vercel project that provides a rough outline of this infrastructure
:LOGBOOK:
- State "DONE"       from "TODO"       [2022-09-14 Wed 11:19] \\
  Resolved with the help of Sebastian from Vercel. Core point was that we only defined a non-root rewrite =/:match*= instead of defining a root rewrite =/=.
:END:

Stubbed vercel-config but it is broken. We debugged this together to no avail and I just filed Case #00097879 with Vercel Customer Support.

*** TODO Proxy Plausible paths

In order to ensure that we hit our analytics back-end, we can define some rewrite rules towards Plausible.

*** TODO Parameterize Plausible magic strings :@vidbina:

The Plausible config is hard-coded in the codebase and pollutes our analytics because it also records localhost or staging traffic.

** TODO Think about how to solve payments
:LOGBOOK:
- State "TODO"       from "TODO"       [2022-09-14 Wed 11:20] \\
  Not actively tackling this since we are too early stage to worry about payments at the moment. We're focusing on the big picture bits for now.
:END:

Wants:
1. Reporting: Single *transaction overview at end-of-the-month* to simplify accounting
2. Invoicing: Capability to automatically issue PDF invoices to customers in-platform
   - nice-to-have support to direct these invoices to a *billing address* to simplify processing for companies

* Decision

** DONE Develop marketplace concept :product:

This is a product concern so I'm signing this over to the product scope which is in the [[https://gitlab.com/formation.tools/intel][shared intel repo]].

* Principles

Use these as tools to guide you through every engineering choice.

** Minimize Toil

We are a *small team* and probably always will be (kind of like a small formation of synchronized dancers 🩰 or a well-tuned squad of special forces operatives). Because of our size, we have to build solutions that *minimize manual effort on remedial tasks*.

:BACKGROUND:
Refer to [[https://sre.google/sre-book/eliminating-toil/][Eliminating Toil [Google SRE Handbook]​]].
:END:

** Design First, Implement After

For anything we attempt to engineer, we make it a habit to design first by drafting a document that outlines the *problem*, potential *solution candidates* with reasons for why the candidates are preferred or not. This document is already an example of such a text because we have been "thinking out" ideas in this doc. 😅

💡 Really try to not initiate implementation work without first going through a design effort!
#+begin_comment
👨🏿‍💻 License to Hack: Sometimes a quick and dirty prototype is arguably part of the "design effort" and maybe even a required step in order to understand a problem and related constraints (for example tooling constraints) better. Somethings are simply hard to sketch out in advance or phrase in clear terms, so, in the spirit of show/hack-and-tell, feel free to whip up the occasional prototype to serve as "documentation" to communicate a design.
#+end_comment

When engineering software, start with a README in a repository and document the problem and some solution candidates.

:BACKGROUND:
The following is an example of a minimal README for an imaginary project.

#+begin_src org
,#+TITLE: Org API

,* Problem

- Org is a rather extensive (complex) standard
- Changing source on a per-character basis is leaves room for "breaking the format" (e.g.: when necessary punctionation is altered
- From a user-perspective, Org operations happen on an Org-primitives (e.g.: we add text to a heading, we remove a link, we boldface a phrase of text) which a renderer or editor will need to understand

,* Solution Options

- find Org parser that is usable with JavaScript (because we're building something for the browser)
  - org-parser (ClojureScript) based on instaparse (ClojureScript)
    - built with instaparse (seems like a mature parsing toolbox)
    - written in ClojureScript (should be compileable to JavaScript and reuseable in other apps, need to explore this)
    - implemented through expression of *BNF grammar* (a practical abstraction for the parsing problem)
    - developed by 200ok.ch (respected consulting firm with plenty of Org and ClojureScript experience)
- implement own Org parser
  - from scratch (too expensive, not core business, little value to be added to project)
  - in unified ecosystem tooling (implementation of large Org syntax would introduce a lot of work that doesn't directly add value to the project)
#+end_src
:END:

** Keep single sources of truth

When any topic needs to be documented, find the one place where most will think to look for this information.

For a software project, this will be the git repositories or a more general architecture document in a dedicated knowledge base or another repository.

For a product idea, this will be the place were such ideation typically happens like a product management or project management tool.

Try to avoid replicating information because synchronizing multiple sources is a hard chore. Think: DRY!

** Be creative and brief in documenting

We don't all process information the same way. When documenting information consider the following modalities:
- text
- image (for example: diagrams, graphs and illustrations/sketches)
- video

Write in a manner that feels natural to hear such that folks using TTS (text-to-speech) tools can follow along.

Since search mostly functions through text, try to accompany every non-text artefact (e.g.: video, diagram, photograph, audio snippet, etc.) with human-readable description.

Since we don't all parse information best through text alone, try to provide diagrams when possible for those who need visual cues. Complement your diagram entries with sufficiently descriptive alt-texts or summaries such that the idea within the diagram is communicated even if the summary is read without awareness of the image. Do the same for any non-text artefact that you may add to a document.

#+begin_comment
With complex diagrams, it may be easier to define high level relationships in the diagram and then follow them with a bit of elaboration up to an arbitrary level. In the spirit of time, we can attempt to keep these descriptions brief. We're hoping that someday there will be better tooling to help us convert such artefacts to prose for the folks who will need it.
#+end_comment


* Example Org files

- https://github.com/higham/org-mode-syntax-cheat-sheet/blob/master/cheat_sheet.org (from [[https://nhigham.com/2017/11/02/org-mode-syntax-cheat-sheet/][webpage]])
`

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Modes/Prose',
  component: Prose,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    doc: {
      control: 'text',
      description: 'Raw Org text',
    },
    isSerif: {
      control: 'boolean',
    },
  },
} as ComponentMeta<typeof Prose>

// Wrapper component that parses the doc prop before passing it to Linear which
// allows us to fiddle with a convenient text control where we enter raw Org
// text for fast feedback.
// https://storybook.js.org/docs/react/essentials/controls#fully-custom-args
const OrgProse = ({ doc, ...args }: { doc: string }) => (
  <Prose doc={parse(doc)} {...args} />
)

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const WrappedTemplate: ComponentStory<typeof OrgProse> = (args) => (
  <OrgProse {...args} />
)

const Template: ComponentStory<typeof Prose> = (args) => <Prose {...args} />

export const PlayableProse = WrappedTemplate.bind({})
PlayableProse.args = {
  doc: text,
}

export const EmptyProse = Template.bind({})
EmptyProse.args = { doc: parse('') }

export const OneLineProse = Template.bind({})
OneLineProse.args = { doc: parse('Just a single line') }

export const UnparsableProse = Template.bind({})
UnparsableProse.args = {
  doc: parse(`
<html>
  <head><title>This is not Org</title></head>

  <body>
    <p>Just trynna break things. 🤷🏿‍♂️</p>

    <p>Note how the line breaks are parsed as paragraph delimiters</p>
  </body>
</html>`),
}

export const MultipleLinksInAParagraph = WrappedTemplate.bind({})
MultipleLinksInAParagraph.args = { doc: multipleLinkInParaText }
